import { Text, Button } from "react-native-elements";
import { ImageBackground, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

function WelcomeScreen(props) {
  useEffect(() => {
    async function GolfFromBdd() {
      var rawResponse = await fetch(
        "https://calm-bastion-61741.herokuapp.com/askgolf"
      );
      var response = await rawResponse.json();
      props.onInitPage(response);
    }
    GolfFromBdd();
  }, []);

  const [isLogin, setIsLogin] = useState(false);

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  AsyncStorage.getItem("info User", function (error, data) {
    var userData = JSON.parse(data);

    if (userData) {
      props.addToken(userData.token);
      props.addUser(userData.userPrenom);
      setIsLogin(true);
    }
  });

  var welcome;

  if (isLogin) {
    welcome = (
      <Text style={styles.text}>
        Welcome Back {"\n"} {props.user} !
      </Text>
    );
  } else {
    welcome = <Text style={styles.text}>Welcome To GolfApp</Text>;
  }

  var cheminLogin = () => {
    if (isLogin) {
      props.navigation.navigate("BottomNavigator", { screen: "Home" });
    } else {
      props.navigation.navigate("BottomNavigator", { screen: "StackMap" });
    }
  };
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ImageBackground
        source={require("../assets/paysage1.jpeg")}
        style={styles.container}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View>{welcome}</View>

          <View>
            <Button
              title="GO GOLFING"
              buttonStyle={{
                backgroundColor: "#3AB795",
              }}
              titleStyle={{ color: "white" }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={cheminLogin}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 40,
    fontWeight: "500",
    fontFamily: "Roboto_400Regular",
    textAlign: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
    addUser: function (user) {
      console.log(user);
      dispatch({ type: "addUser", user: user });
    },
    onInitPage: function (golf) {
      dispatch({ type: "AddGolf", golf: golf });
    },
  };
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
