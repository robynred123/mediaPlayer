import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "../screens/ScreenStyles";
import Ionicons from "react-native-vector-icons/Ionicons";

export const Item = ({
  item,
  onPress,
  onEdit,
  onDelete,
  selectedSong,
}) => {

  const backgroundColor = () => {
    if(selectedSong){
      if(item.songId === selectedSong.songId) {
          return {
          ...styles.item,
          backgroundColor: '#d7d8d9'
        }
      }
    }
    return styles.item
  }

  return (
    <View>
      <TouchableOpacity style={backgroundColor()} onPress={onPress}>
        <Text>{item.name}</Text>
        <View style={styles.iconContainer}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit}>
              <Ionicons name={"brush"} size={20} style={styles.icons} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name={"trash"} size={20} style={styles.icons} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};
