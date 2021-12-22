import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import { addSong } from "../actions/songs";
import { GREEN } from "../util/constants";
import { addPlaylist } from "../actions/playlists";

export const Add = ({ navigation, route }) => {
  const history = route.params;
  const [file, setFile] = useState(false); //file to upload boolean
  const [name, setName] = useState(null);
  const [artist, setArtist] = useState(null);
  const [uri, setUri] = useState(null);

  const dispatch = useDispatch();

  const clearState = () => {
    setName(null);
    setArtist(null);
    setUri(null);
    setFile(null);
    navigation.navigate(history);
  };

  const createPlaylist = () => {
    dispatch(addPlaylist(name))
    clearState()
  }

  const pickFile = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "audio/mpeg" });

    if (!result.cancelled) {
      setFile(true);
      setName(result.name);
      setUri(result.uri);
    }
  };

  const uploadFile = async () => {
    if (file) {
      let song = {
        name: name,
        artist: artist,
        location: uri,
        playlists: ""
      };

      dispatch(addSong(song));
      clearState();
    }
  };

  const renderView = () => {
    if (history === "Songs") {
      return (
        <View style={styles.content}>
          <View style={styles.selectFileContainer}>
            <TextInput
              style={styles.input}
              disabled={true}
              defaultValue={uri}
            />
            <TouchableOpacity onPress={() => pickFile()}>
              <Ionicons name={"folder"} size={50} style={styles.icons} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>Edit</Text>
            <Text>Name: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              defaultValue={name}
              value={name}
            />

            <Text>Artist:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setArtist}
              defaultValue={artist}
              value={artist}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buttonCancel, styles.button]}
              onPress={() => {
                clearState();
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonUpload, styles.button]}
              onPress={() => uploadFile()}
            >
              <Text>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <Text>Name: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              defaultValue={name}
              value={name}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.buttonCancel, styles.button]}
              onPress={() => {
                clearState();
              }}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonUpload, styles.button]}
              onPress={() => createPlaylist()}
            >
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return <View>{renderView()}</View>;
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    height: "100%",
  },
  selectFileContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    padding: 10,
  },
  title: {
    paddingTop: 10,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    borderWidth: 1,
    padding: 5,
    margin: 10,
  },
  icons: {
    color: GREEN,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 20,
    paddingRight: "20%",
    paddingLeft: "20%",
    position: "absolute",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    paddingRight: 25,
    paddingLeft: 25,
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonUpload: {
    backgroundColor: GREEN,
  },
  buttonCancel: {
    color: GREEN,
  },
});
