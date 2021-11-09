import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";

import { getSongs } from "../actions/songs";
import { showModal, hideModal } from "../actions/app";
import { EditModal } from "../components/EditModal";

export const Songs = () => {
  const [songs, setSongs] = useState([]);
  const songList = useSelector((state) => state?.songs.songList);
  const error = useSelector((state) => state?.songs.error);
  const visible = useSelector((state) => state?.app?.visible);
  const song = useSelector((state) => state?.app?.song);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSongs());
  }, []);

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
        <TouchableOpacity onPress={() => dispatch(showModal(item))}>
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
        <EditModal visible={visible} onPress={() => dispatch(hideModal())} song={song}/>
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
    //backgroundColor: 'blue',
    height: "100%",
  },
  flatList: {
    padding: 20,
    //backgroundColor: 'red',
    width: "100%",
    borderWidth: 0.5,
  },
  item: {
    //backgroundColor: 'blue',
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
    color: "#30C169",
  },
});
