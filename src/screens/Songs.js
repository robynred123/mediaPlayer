import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import { getSongs, clearChanged, deleteSong, setSelectedSong } from "../actions/songs";
import { onPressDirection } from "../util/musicPlayerActions";
import { showModal, hideModal } from "../actions/app";
import { Item } from "../components/Item";
import { EditModal } from "../components/EditModal";
import { MusicPlayer } from "../components/MusicPlayer";
import { styles } from "./ScreenStyles";

export const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState(null)
  const songList = useSelector((state) => state?.songs.songList);
  const error = useSelector((state) => state?.songs.error);
  const songChanged = useSelector((state) => state?.songs.songChanged);
  const selectedSong = useSelector((state) => state?.songs.selectedSong);
  const playing = useSelector((state) => state?.songs.playing);
  const visible = useSelector((state) => state?.app?.visible);
  const playlists = useSelector((state) => state?.playlists?.playlists)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());
    if(songChanged) {
      dispatch(clearChanged())
    }
  }, [songChanged]);

  useEffect(() => {
    if (songList) {
      if (songs) {
        setSongs(songList);
      }
    }
  }, [songList]);

  const renderItem = (item) => (
    <Item 
      item={item}
      onPress={() => dispatch(setSelectedSong(item)) }
      onEdit={() => { setSong(item), dispatch(showModal())} } 
      onDelete={() => dispatch(deleteSong(item.songId))}
      selectedSong={selectedSong || null}
    />
  );

  return (
    <>
     <View>
        <EditModal 
          visible={visible} 
          closeModal={() => dispatch(hideModal())} 
          song={song}
          dispatch={dispatch}
          playlists={playlists}
          />
      </View>

    <SafeAreaView style={styles.content} edges={["bottom", "left", "right"]}>
      {songs ? (
        <FlatList
          style={styles.flatList}
          data={songs}
          keyExtractor={(item, index) => item.songId}
          renderItem={({ item }) => renderItem(item)}
        />
      ) : (
        <Text> Import a Song! </Text>
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
    </>
  );
};
