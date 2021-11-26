import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import { getSongs, clearChanged, deleteSong, setSelectedSong } from "../actions/songs";
import { showModal, hideModal } from "../actions/app";
import { EditModal } from "../components/EditModal";
import { MusicPlayer } from "../components/MusicPlayer";
import { GREEN } from "../util/constants";

export const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState(null)
  const songList = useSelector((state) => state?.songs.songList);
  const error = useSelector((state) => state?.songs.error);
  const songChanged = useSelector((state) => state?.songs.songChanged);
  const selectedSong = useSelector((state) => state?.songs.selectedSong);
  const visible = useSelector((state) => state?.app?.visible);

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
        if (songList !== songs) {
          setSongs(songList);
        }
      } else setSongs(songList);
    }
  }, [songList]);

  const renderItem = (item) => (
    <View>
      <TouchableOpacity style={styles.item} onPress={() => dispatch(setSelectedSong(item))}>
      <Text>{item.name}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {
          setSong(item)
          dispatch(showModal())
          }}>
          <Ionicons
            name={"brush"}
            size={20}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(deleteSong(item.songId))}>
          <Ionicons
            name={"trash"}
            size={20}
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
     <View>
        <EditModal 
          visible={visible} 
          closeModal={() => dispatch(hideModal())} 
          song={song}
          dispatch={dispatch}
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
    <MusicPlayer selectedSong={selectedSong}/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    height: "100%",
  },
  flatList: {
    paddingRight: 20,
    paddingLeft: 20,
    width: "100%",
  },
  item: {
    flexDirection: "row",
    height: 30,
    alignContent: "center",
  },
  iconContainer: {
    right: 0,
    position: "absolute",
    height: "100%",
    width: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    color: GREEN,
  },
  musicPlayer: {
    position: 'absolute',
    bottom: 0
  }
});
