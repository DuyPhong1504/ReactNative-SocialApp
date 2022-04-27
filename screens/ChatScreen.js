import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import moment from "moment";

const ChatScreen = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.login.profile);

  console.log(user.email);
  const getMessages = () => {
    try {
      setLoading(true);
      db.collection("messages")
        .get()
        .then((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((documentSnapshot) => {
            items.push({
              id: documentSnapshot.id,
              userName: documentSnapshot.data().userName,
              createAt: documentSnapshot.data().createAt,
              text: documentSnapshot.data().text,
            });
            // console.log(documentSnapshot.id, documentSnapshot.data());
          });
          // const temp = items.filter(
          //   (message) => message.userName === user.email
          // );
          setMessages(items);
          setLoading(false);
          console.log(items);
        });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  const renderMessages = (message) => {
    return (
      <View>
        <View
          style={[
            message.userName === user.email
              ? styles.messageBox
              : styles.messageBoxother,
          ]}
        >
          <Image
            source={require("../assets/avatar.jpg")}
            style={styles.avatar}
          />
          <View style={styles.message}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        </View>
        <Text
          style={[
            styles.timestamp,
            message.userName === user.email
              ? { marginLeft: 20 }
              : { marginLeft: 280 },
          ]}
        >
          {moment(message.createAt).fromNow()}
        </Text>
      </View>
    );
  };

  const handleAddMessage = () => {
    if (text == "") {
      alert("chat box is empty");
      return;
    }
    const temp = {
      userName: user.email,
      createAt: Date.now(),
      text: text,
    };
    db.collection("messages")
      .add(temp)
      .then(renderMessages())
      .catch((error) => alert(error.message));
    setText("");
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ marginTop: "50%" }}>
          <ActivityIndicator size="large" color="pink" />
        </View>
      ) : (
        <>
          {/* <View style={styles.messageArea}>
            <View style={styles.messageBoxother}>
              <Image
                source={require("../assets/avatar.jpg")}
                style={styles.avatar}
              />

              <View style={styles.message}>
                <Text style={styles.messageText}>Abcd</Text>
              </View>
            </View>
          </View> */}

          <FlatList
            data={messages}
            renderItem={({ item }) => renderMessages(item)}
            key={(item) => item.id}
            
          />

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="chat here"
              placeholderTextColor="#003f5c"
              value={text}
              onChangeText={(text) => setText(text)}
            />
            <TouchableOpacity
              style={styles.btnSend}
              onPress={() => handleAddMessage()}
            >
              <Text>SEND</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
  },
  messageArea: {
    flex: 1,
    flexDirection: "column",
  },
  messageBox: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  messageBoxother: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    backgroundColor: "#FFC0CB",
    borderRadius: 20,
    width: "80%",
  },
  inputView: {
    width: "100%",
    height: 60,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 620,
  },
  message: {
    height: 30,
    width: "20%",
    backgroundColor: "#00CCFF",

    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  messageText: {
    fontSize: 18,
    color: "white",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 24,
    marginHorizontal: 10,
  },
  btnSend: {
    width: 50,
    height: 45,
    borderRadius: 50,
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  timestamp: {
    fontSize: 11,
  },
});
