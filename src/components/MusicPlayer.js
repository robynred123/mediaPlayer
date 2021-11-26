import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Audio } from "expo-av";

import { GREEN } from "../util/constants";

export const MusicPlayer = ({ selectedSong }) => {
  const [play, setPlay] = useState(true); //boolean - play/pause
  const [sound, setSound] = React.useState(null);

  const playPause = () => {
    if (selectedSong !== null) {
      setPlay(!play);
      if (play) {
        playSound();
      }
      else {
        Audio.Sound.pauseAsync()
        setSound(null)
      }
    }
  };

  async function playSound() {
    console.log("Loading Sound");
      const location = selectedSong?.location;
      console.log(location)
      const music = await Audio.Sound.createAsync({ uri: location },
      {
        shouldPlay: true,
      });
      setSound(music);

      console.log("Playing Sound");
      await sound.playAsync();
  }

  return (
    <>
      {selectedSong && (
        <View style={styles.textBanner}>
          <Text>
            {selectedSong.name} {selectedSong.artist}
          </Text>
        </View>
      )}
      <View style={styles.musicPlayer}>
        <TouchableOpacity onPress={() => console.log("Back")}>
          <Ionicons name={"arrow-back"} size={25} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => playPause()}>
          {play ? (
            <Ionicons name={"play"} size={25} style={styles.icons} />
          ) : (
            <Ionicons name={"pause"} size={25} style={styles.icons} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("Forward")}>
          <Ionicons name={"arrow-forward"} size={25} style={styles.icons} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  musicPlayer: {
    padding: 10,
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    borderTopWidth: 1,
    backgroundColor: "white",
  },
  icons: {
    color: GREEN,
  },
  textBanner: {
    backgroundColor: "blue",
    position: "absolute",
  },
});
