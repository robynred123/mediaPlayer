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
import { getPlaylists } from "../actions/playlists";
import { clearChanged } from "../actions/songs";
import { GREEN } from "../util/constants";

export const Playlists = () => {
  const songList = useSelector((state) => state?.songs.songList);
  const error = useSelector((state) => state?.songs.error);
  const selectedSong = useSelector((state) => state?.songs.selectedSong);
  const playing = useSelector((state) => state?.songs.playing);
  const playlistsList = useSelector((state) => state?.playlists.playlists); //list of playlists
  const playlistChanged = useSelector((state) => state?.playlists.playlistChanged) 

  const [playlists, setPlaylists] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if(playlistsList !== playlists) {
      dispatch(getPlaylists())
    }
    setPlaylists(playlistsList)
    dispatch(clearChanged())
  }, [playlistChanged])

  const renderItem = (item) => (
    <View>
      <TouchableOpacity style={styles.item}>
      <Text>{item.name}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => {
          //setPlaylist(item)
          //dispatch(showModal())
          console.log('edit playlist')
          }}>
          <Ionicons
            name={"brush"}
            size={20}
            style={styles.icons}
          />
        </TouchableOpacity>
        <TouchableOpacity /*onPress={() => dispatch(deletePlaylist(item.playlistId))}*/>
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
    <View>
      <SafeAreaView style={styles.content} edges={["bottom", "left", "right"]}>
      {playlists ? (
        <FlatList
          style={styles.flatList}
          data={playlists}
          keyExtractor={(item, index) => item.songId}
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

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    height: "100%",
  },
  flatList: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    height: 30,
    alignContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
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
    position: "absolute",
    bottom: 0,
  },
});
