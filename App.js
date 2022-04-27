import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import { Provider } from "react-redux";
import store from "./redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import PostScreen from "./screens/PostScreen";
import ListPhoto from "./screens/ListPhoto";
import HomeSreen from "./screens/HomeScreen";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeSreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="List"
            component={ListPhoto}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Stack = createNativeStackNavigator();
