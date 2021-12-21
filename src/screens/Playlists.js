import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MusicPlayer } from "../components/MusicPlayer";
import { onPressDirection } from "../util/musicPlayerActions";

export const Playlists = () => {

  const songList = useSelector((state) => state?.songs.songList);
  const error = useSelector((state) => state?.songs.error);
  const songChanged = useSelector((state) => state?.songs.songChanged);
  const selectedSong = useSelector((state) => state?.songs.selectedSong);
  const playing = useSelector((state) => state?.songs.playing);
  const dispatch = useDispatch()

  return (
    <View>
      <SafeAreaView style={styles.content} edges={["bottom", "left", "right"]}>
        <Text>Playlists</Text>
      </SafeAreaView>

      <View style={styles.musicPlayer}>
      <MusicPlayer 
        playing={playing} 
        selectedSong={selectedSong} 
        onPressForward={() => onPressDirection('forward', songList, selectedSong, dispatch)} 
        onPressBackward={() => onPressDirection('backward', songList, selectedSong, dispatch)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    height: "100%",
  },
  musicPlayer: {
    position: "absolute",
    bottom: 0,
  },
});
