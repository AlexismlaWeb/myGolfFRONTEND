import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";

import { Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function LogScreen(props) {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [messageError, setMessageError] = useState([]);

  var handleSubmitLogin = async () => {
    const data = await fetch("https://calm-bastion-61741.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `emailFromFront=${emailLogin}&passwordFromFront=${passwordLogin}`,
    });

    const body = await data.json();

    if (body.error) {
      setMessageError(body.error);
    }

    if (body.result) {
      var userData = { userPrenom: body.user.userPrenom, token: body.token };

      props.addToken(body.token);
      props.addUser(body.user.userPrenom);
      AsyncStorage.setItem("info User", JSON.stringify(userData));
      setEmailLogin("");
      setPasswordLogin("");
      setMessageError([]);
      props.navigation.navigate("Home");
    }
  };

  var errorLogin = messageError.map((error, i) => {
    return <Text style={{ color: "red" }}>{error}</Text>;
  });

  return (
    <View style={styles.container}>
    <TouchableOpacity
        activeOpacity={0.7}
        style={{
          position: "absolute",
          left: windowWidth - windowWidth / 1.01,
          top: windowHeight - windowHeight / 1.05,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: "#3AB795",
        }}
      >
        <Entypo
          name="chevron-left"
          size={24}
          color="white"
          onPress={() => props.navigation.goBack()}
        />
      </TouchableOpacity>

      <Image
        style={styles.image}
        source={require("../assets/pro-golf-logo-maker-1558a.png")}
      />
      {errorLogin}
      <Text style={styles.signinText}>LOG IN</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmailLogin(email)}
          value={emailLogin}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPasswordLogin(password)}
          value={passwordLogin}
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => handleSubmitLogin()}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={styles.loginText}>CREER UN COMPTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    height: 200,
    width: 200,
  },

  inputView: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#86BAA1",
  },

  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#3AB795",
    borderWidth: 1,
    borderColor: "#86BAA1",
  },
  loginText: {
    color: "white",
  },
  signinText: {
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    color: "#86BAA1",
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
  };
}

export default connect(null, mapDispatchToProps)(LogScreen);
