import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { db } from "../firebase";

const ListPhoto = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  // const post = [
  //   {
  //     id: "1",
  //     name: "Phong",
  //     text: "some thing that you need to test",
  //     timestamp: 1650375096169,
  //     avatar: require("../assets/avatar.jpg"),
  //     image: require("../assets/photo.jpg"),
  //   },
  //   {
  //     id: "2",
  //     name: "Phong",
  //     text: "some thing that you need to test",
  //     timestamp: 1650375096169,
  //     avatar: require("../assets/avatar.jpg"),
  //     image: require("../assets/photo.jpg"),
  //   },
  // ];

  const getData = () => {
    try {
      setLoading(true);
      db.collection("post")
        .get()
        .then((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((documentSnapshot) => {
            items.push({
              id: documentSnapshot.id,
              name: documentSnapshot.data().name,
              text: documentSnapshot.data().text,
              timestamp: documentSnapshot.data().timestamp,
              avatar: documentSnapshot.data().avatar,
              image: documentSnapshot.data().image,
            });
            // console.log(documentSnapshot.id, documentSnapshot.data());
          });
          setPost(items);
          setLoading(false);
          console.log(items);
        });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const renderPost = (post) => {
    return (
      <View style={styles.feedItem}>
        <Image source={require("../assets/avatar.jpg")} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={styles.name}>{post.name}</Text>
              <Text style={styles.timestamp}>
                {moment(post.timestamp).fromNow()}
              </Text>
            </View>

            <Feather name="more-horizontal" size={24} color="#73788B" />
          </View>
          <Text style={styles.post}>{post.text}</Text>
          <Image
            source={{ uri: post.image }}
            style={styles.postImage}
            resizeMode="fit"
          />
          <View style={{ flexDirection: "row" }}>
            <AntDesign
              name="hearto"
              size={24}
              color="#73788B"
              style={{ marginRight: 15 }}
            />
            <Ionicons name="chatbox-outline" size={24} color="#73788B" />
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ marginTop: "50%" }}>
          <ActivityIndicator size="large" color="pink" />
        </View>
      ) : (
        <>
          <FlatList
            style={styles.feed}
            data={post}
            renderItem={({ item }) => renderPost(item)}
            key={(item) => item.id}
            refreshControl={
              <RefreshControl
                //refresh control used for the Pull to Refresh
                onRefresh={() => {
                  getData();
                }}
              />
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ListPhoto;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 24,
    marginHorizontal: 10,
  },
  feed: {
    height: "100%",
    backgroundColor: "pink",
  },
  feedItem: {
    flex: 1,
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "black",
  },
  timestamp: {
    fontSize: 11,
  },
  post: {
    marginTop: 15,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 200,
    borderRadius: 5,
    marginVertical: 16,
  },
});
