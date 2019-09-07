import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

const InputField = ({ placeHolder }) => {
  const [value, setValue] = useState("");

  return (
    <TextInput
      value={value}
      placeholder={placeHolder}
      onChange={text => setValue(text)}
    />
  );
};

const styles = StyleSheet.create({});

export default InputField;
