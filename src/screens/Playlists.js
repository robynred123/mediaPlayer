import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MusicPlayer } from "../components/MusicPlayer";

export const Playlists = () => {
  return (
    <View>
      <SafeAreaView style={styles.content} edges={["bottom", "left", "right"]}>
        <Text>Playlists</Text>
      </SafeAreaView>

      <View style={styles.musicPlayer}>
        <MusicPlayer />
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
