import { bindActionCreators } from "@reduxjs/toolkit";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import Button from "../components/Button";
import { colors } from "../styles/globalColors";
import { setUser } from "../features/auth";
import config from "../config/aplication.config";
import axios from "axios";

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setUser,
    },
    dispatch
  );
};

const LogIn = ({ setUser }) => {
  const [userInput, setUserInput] = useState(undefined);
  const [passwordInput, setPasswordInput] = useState(undefined);
  const [loading, setLoading] = useState(undefined);

  const handleLogIn = async () => {
    setLoading(true);
    try {
      const authentication = await axios.post(config.extra.firebaseAuthLogin, {
        email: userInput,
        password: passwordInput,
        returnSecureToken: false,
      });
      setUser(authentication?.email);
    } catch (error) {
      console.log("CREDENCIALES INCORRECTAS O USUARIO INHABILITADO");
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.logInContainer}>
      <Text style={styles.logInText}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder={"Username"}
        value={userInput}
        onChangeText={setUserInput}
      />
      <TextInput
        style={styles.input}
        placeholder={"Password"}
        value={passwordInput}
        onChangeText={setPasswordInput}
      />
      <Button
        loading={loading}
        style={styles.button}
        buttonTitle="Ingresar"
        onPress={() => handleLogIn()}
      ></Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logInText: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.boldGreen,
    marginBottom: 40,
  },
  logInContainer: {
    // width: "90%",
    height: "95%",
    // backgroundColor:"green",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  input: {
    width: "60%",
    height: 35,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 1.5,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.5,
    elevation: 3,
  },
  button: {
    marginTop: 5,
    width: "60%",
    backgroundColor: colors.lighGreen,
  },
});

export default connect(undefined, mapDispatchToProps)(LogIn);
