import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { storage, auth, db } from "../firebase";
import { Ionicons } from "@expo/vector-icons";

const PostScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.login.profile);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [post, setPost] = useState({
    name: "",
    text: "",
    timestamp: Date.now(),
    avatar: "../assets/avatar.jpg",
    image: "",
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadPhotoAsync = async () => {
    setLoading(true);
    const uri = image;
    let fileName = uri.substring(uri.lastIndexOf("/") + 1);
    const uid = auth.currentUser.uid;
    const path = `photos/${uid}/${fileName}`;
    try {
      if (post.text !== "") {
        const response = await fetch(image);
        const file = await response.blob();

        //upload image
        storage
          .ref(path)
          .put(file)
          .then(() => {
            //get link image that upload success
            storage
              .ref(path)
              .getDownloadURL()
              .then((url) => {
                // Do something with the URL ...
                // alert("Successfully upload");
                hadleAddPost(url);
                setLoading(false);
              });
          });
      } else {
        alert("text is empty");
      }
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  const hadleAddPost = (url) => {
    var temp = post;
    temp.image = url;
    console.log(temp);
    db.collection("post")
      .add(temp)
      .then(alert("add success"))
      .catch((error) => alert(error.message));
    setPost({
      name: "",
      text: "",
      timestamp: Date.now(),
      avatar: "../assets/avatar.jpg",
      image: "",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header></Header> */}
      {/* <Text>Hello {user.email}</Text> */}
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="pink" />
          <Text>Posting</Text>
        </View>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/avatar.jpg")}
              style={styles.avatar}
            />
            <TextInput
              autoFocus={true}
              multiline={true}
              numberOfLines={5}
              style={{ flex: 1 }}
              placeholder="Want to share something?"
              value={post.text}
              onChangeText={(text) =>
                setPost({
                  name: user.email,
                  text: text,
                  timestamp: Date.now(),
                  avatar: "../assets/avatar.jpg",
                  image: "",
                })
              }
            ></TextInput>
          </View>

          <TouchableOpacity onPress={() => pickImage()}>
            {/* <Text>+</Text> */}
            <Ionicons name="md-camera" size={32} />
          </TouchableOpacity>
          <Image style={styles.image} source={{ uri: image }} />

          <TouchableOpacity
            style={styles.btnUpload}
            onPress={() => uploadPhotoAsync()}
          >
            <Text>Post</Text>
          </TouchableOpacity>
        </>
      )}

      {/* <TouchableOpacity style={styles.btnUpload} onPress={() => hadleAddPost()}>
        <Text>Add post</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnAdd: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    margin: 50,
    backgroundColor: "red",
  },
  image: {
    width: "90%",
    height: 250,
  },
  btnUpload: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "pink",
  },
  inputContainer: {
    margin: 32,
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 24,
    marginHorizontal: 10,
  },
});
