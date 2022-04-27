import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostScreen from "./PostScreen";
import ListPhoto from "./ListPhoto";
import Header from "../components/Header";
import { FontAwesome, Ionicons, Entypo } from "@expo/vector-icons";
import ChatScreen from "./ChatScreen";

const Tab = createBottomTabNavigator();

const HomeSreen = () => {
  return (
    <Tab.Navigator
      style={styles.bottomNavigator}
      screenOptions={{ tabBarStyle: { position: "absolute" } }}
    >
      <Tab.Screen
        options={{
          header: Header,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={40} color="gray" />
          ),
          tabBarLabel: "Home",
        }}
        name="List"
        component={ListPhoto}
      />
      <Tab.Screen
        options={{
          header: Header,
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add-circle" size={40} color="#E9446A" />
          ),
        }}
        name="Post"
        component={PostScreen}
      />
      <Tab.Screen
        options={{
          header: Header,
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={40} color="black" />
          ),
          tabBarLabel: "Chat",
        }}
        name="Chat"
        component={ChatScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeSreen;

const styles = StyleSheet.create({});
