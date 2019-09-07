import React, { Component } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import InputField from "../components/InputField";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    console.log(this.props.navigation);
    return (
      <View>
        <Text>Chat</Text>
        <Text>Accedi</Text>
        <InputField placeHolder="Username" />
        <Button
          title="Accedi"
          onPress={() => this.props.navigation.navigate("HomeScreen")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
