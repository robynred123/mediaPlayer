import React from "react";
import { View, Text } from "react-native";

export const Add = ({navigation, route}) => {
  
  const type = route.params
  console.log(type)
  return (
    <View>
      <Text>Add</Text>
    </View>
  );
}; 