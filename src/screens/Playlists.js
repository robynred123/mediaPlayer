import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import { MusicPlayer } from "../components/MusicPlayer";
import { onPressDirection } from "../util/musicPlayerActions";
import { getPlaylists, deletePlaylist } from "../actions/playlists";
import { clearChanged } from "../actions/songs";
import { styles } from "./ScreenStyles";
import { Item } from "../components/Item";

export const Playlists = () => {
  const songList = useSelector((state) => state?.songs.songList);
  const error = useSelector((state) => state?.songs.error);
  const selectedSong = useSelector((state) => state?.songs.selectedSong);
  const playing = useSelector((state) => state?.songs.playing);
  const playlistsList = useSelector((state) => state?.playlists.playlists); //list of playlists
  const playlistChanged = useSelector((state) => state?.playlists.playlistsChanged); //if add, edit, or delete

  const [playlists, setPlaylists] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlaylists());
    if(playlistChanged) {
      dispatch(clearChanged())
    }
  }, [playlistChanged]);

  useEffect(() => {
    if (playlistsList) {
      if (playlistsList !== playlists) {
        setPlaylists(playlistsList);
      }
    }
  }, [playlistsList]);

  const renderItem = (item) => (
    <Item 
      item={item}
      onPress={() => console.log('pressed!')/*dispatch(setSelectedPlaylist(item))*/}
      onDelete={() => dispatch(deletePlaylist(item.playlistId))}
      selectedSong={selectedSong || null}
    />
  );

  return (
    <View>
      <SafeAreaView style={styles.content} edges={["bottom", "left", "right"]}>
      {playlists ? (
        <FlatList
          style={styles.flatList}
          data={playlists}
          keyExtractor={(item, index) => item.playlistId}
          renderItem={({ item }) => renderItem(item)}
        />
      ) : (
        <Text> create a playlist! </Text>
      )}
    </SafeAreaView>

      <View style={styles.musicPlayer}>
      <MusicPlayer 
        playing={playing} 
        selectedSong={selectedSong} 
        onPressForward={() => onPressDirection('forward', songList, selectedSong, dispatch)} 
        onPressBackward={() => onPressDirection('backward', songList, selectedSong, dispatch)}
      />
      </View>
    </View>
  );
};
