import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { auth } from "../firebase";
import { Logout } from "../action/userLoginAction";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        const action = Logout();
        dispatch(action);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.header}>
      <Text> Photo app</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ fontWeight: "500" }}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    position: "absolute",
    top: 30,
    width: "100%",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    fontSize: 30,
  },
});
