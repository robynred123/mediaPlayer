import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

import { MusicPlayer } from "../components/MusicPlayer";
import { onPressDirection } from "../util/musicPlayerActions";
import { clearChanged, setSelectedSong, editSong, getSongs } from "../actions/songs";
import { styles } from "./ScreenStyles";
import { Item } from "../components/Item";

export const PlaylistSongs = ({route}) => {
  const [songs, setSongs] = useState([]);
  const songList = useSelector((state) => state?.songs.songList);
  const songChanged = useSelector((state) => state?.songs.songChanged);
  const selectedSong = useSelector((state) => state?.songs.selectedSong);
  const playing = useSelector((state) => state?.songs.playing);

  const { playlistId } = route.params

  const dispatch = useDispatch();

  useEffect(() => {
    let playlistSongs = [];
    if (songList) {
      if (songList.length >= 1) {
        //map through songs
        songList.map((s) => {
          if (s.playlists !== "") {
            //map out song playlists, if one matching the playlist exists, add song to array
            let parsedPlaylists = JSON.parse(s.playlists);
            parsedPlaylists.map((p) => {
              if (p.playlistId === playlistId) {
                playlistSongs.push(s);
              }
            });
          }
        });
      }
    }
    //set songs as array
    setSongs(playlistSongs);

    if (songChanged) {
      dispatch(getSongs())
    }
  }, [playlistId, songList]);

  const removeFromPlaylist = (item) => {
    let playlists = JSON.parse(item.playlists)
    let newPlaylists = playlists.filter((p) => p.playlistId !== playlistId)
    let formattedPlaylists = JSON.stringify(newPlaylists)
    dispatch(editSong(item.songId, item.name, item.artist, formattedPlaylists))
  }

  const renderItem = (item) => (
    <Item
      item={item}
      onPress={() => dispatch(setSelectedSong(item))}
      onDelete={() => removeFromPlaylist(item)}
      selectedSong={selectedSong || null}
    />
  );

  return (
    <View>
      <SafeAreaView style={styles.content} edges={["bottom", "left", "right"]}>
        {songs ? (
          <FlatList
            style={styles.flatList}
            data={songs}
            keyExtractor={(item, index) => item.songId}
            renderItem={({ item }) => renderItem(item)}
          />
        ) : (
          <Text> Add A Song To Your Playlist! </Text>
        )}
      </SafeAreaView>
      <View style={styles.musicPlayer}>
        <MusicPlayer
          playing={playing}
          selectedSong={selectedSong}
          onPressForward={() =>
            onPressDirection("forward", songs, selectedSong, dispatch)
          }
          onPressBackward={() =>
            onPressDirection("backward", songs, selectedSong, dispatch)
          }
        />
      </View>
    </View>
  );
};
