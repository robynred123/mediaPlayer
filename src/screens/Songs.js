import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import { getSongs, editSong, clearAdded } from "../actions/songs";
import { showModal, hideModal } from "../actions/app";
import { EditModal } from "../components/EditModal";
import { GREEN } from "../util/constants";

export const Songs = () => {
  const [songs, setSongs] = useState([]);
  const [song, setSong] = useState(null)
  const songList = useSelector((state) => state?.songs.songList);
  const error = useSelector((state) => state?.songs.error);
  const songAdded = useSelector((state) => state?.songs.songAdded);
  const visible = useSelector((state) => state?.app?.visible);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());
    console.log(songAdded, songList)
    if(songAdded) {
      dispatch(clearAdded())
    }
  }, [songAdded]);

  useEffect(() => {
    if (songList) {
      if (songs) {
        if (songList.length !== songs.length) {
          setSongs(songList);
        }
      } else setSongs(songList);
    }
  }, [songList]);

  const renderItem = (item) => (
    <View style={styles.item}>
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
        <TouchableOpacity onPress={() => console.log("DELETE")}>
          <Ionicons
            name={"trash"}
            size={20}
            style={styles.icons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
     <View>
        <EditModal visible={visible} onSubmit={() => dispatch(editSong(), hideModal()) } onCancel={() => dispatch(hideModal())} song={song}/>
      </View>

    <SafeAreaView style={styles.content} edges={["bottom", "left", "right"]}>
      {songs ? (
        <FlatList
          style={styles.flatList}
          data={songs}
          renderItem={({ item }) => renderItem(item)}
        />
      ) : (
        <Text> Import a Song! </Text>
      )}
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    height: "100%",
  },
  flatList: {
    padding: 20,
    width: "100%",
    borderWidth: 0.5,
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
});
