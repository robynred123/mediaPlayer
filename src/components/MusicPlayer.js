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
import { setSongStatus } from "../actions/songs";

export const MusicPlayer = ({ 
  selectedSong, 
  onPressForward, 
  onPressBackward,
  playing
}) => {
  const [loading, setLoading] = useState(false)
  const [loadedSong, setLoadedSong] = useState(null)
  const dispatch = useDispatch()
  const sound = React.useRef(new Audio.Sound());

  let location = selectedSong?.location;

  useEffect(() => {
    if(loadedSong !== selectedSong) {
      unloadSound()
      loadAudio();
    }
  }, [selectedSong]);

  useEffect(() => {
    if (playing) {
      playSound();
    }
    else {
      PauseSound()
    }
  }, [playing])

  const playPause = () => {
    if (selectedSong !== null) {
      dispatch(setSongStatus(!playing))
    }
  };

  const unloadSound = async () => {
    await sound.current.unloadAsync()
  };

  const playSound = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const PauseSound = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.log(error)
    }
  };

  const loadAudio = async () => {
    setLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync({uri: location}, true);
        if (result.isLoaded === false) {
          setLoading(false);
          console.log('Error in Loading Audio');
        } else {
          setLoading(false);
          setLoadedSong(selectedSong)
          if(playing){ 
            playSound()
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
      if(playing){ 
        playSound()
      }
    }
  };

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
        <TouchableOpacity onPress={onPressBackward}>
          <Ionicons name={"arrow-back"} size={25} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => playPause()}>
          {playing ? (
             <Ionicons name={"pause"} size={25} style={styles.icons} />
          ) : (
            <Ionicons name={"play"} size={25} style={styles.icons} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onPressForward}>
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
