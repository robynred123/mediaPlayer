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
import MultiSelect from "react-native-multiple-select";

import { GREEN } from "../util/constants";
import { editSong } from "../actions/songs";
import { hideModal } from "../actions/app";

export const EditModal = ({ visible, song, playlists }) => {
  const [name, setName] = useState(song?.name);
  const [artist, setArtist] = useState(song?.artist);
  const [chosenPlaylists, setChosenPlaylists] = useState();
  const [tempPlaylists, setTempPlaylists] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setName(song?.name);
    setArtist(song?.artist);
    updateChosen();
  }, [visible]);

  const updateChosen = () => {
    if (
      song?.playlists !== "" &&
      song?.playlists !== undefined &&
      song?.playlists.length >= 1
    ) {
      let existingPlaylists = [];
      let playlistsToArray = JSON.parse(song?.playlists);
      //if multiple playists exist on song, map through
      if (playlistsToArray.length > 1) {
        playlistsToArray.map((s) => {
          if (s == undefined || s == null) {
            return;
          }
          //check playlist exists
          let playlistExists = playlists.filter((p) => p.name === s.name);
          //if exists, add to array of playlistIds
          if (playlistExists.length >= 1) {
            existingPlaylists.push(s.playlistId);
          }
        });
      }
      //if only 1, cannot map, check exists
      else if (playlistsToArray.length === 1) {
        if (playlistsToArray[0] == undefined || playlistsToArray[0] == null) {
          return;
        }
        let playlistExists = playlists.filter(
          (p) => p.name === playlistsToArray[0].name
        );
        //if exists, add to new array of playlistIds
        if (playlistExists.length >= 1) {
          existingPlaylists.push(playlistsToArray[0].playlistId);
        }
      }
      //if there are deleted playlists
      if (song?.playlists.length !== existingPlaylists.length) {
        //set temporary changes - updates song playlists on cancel
        setTempPlaylists(existingPlaylists);
      }
      //regardless, set to chosen playlists. Multiple picker only works with 1 value, cannot use objects.
      setChosenPlaylists(existingPlaylists);
    }
  };

  //Add error handling & play playlists
  const updatePlaylists = (selectedItems) => {
    setChosenPlaylists(selectedItems);
  };

  //change list of Ids to list of playlists on submit
  const mapPlaylists = () => {
    let newPlaylists = [];
    if (chosenPlaylists) {
      if (chosenPlaylists.length > 1) {
        chosenPlaylists.map((c) => {
          let selectedPlaylist = playlists.filter((p) => p.playlistId === c);
          let index = playlists.indexOf(selectedPlaylist[0]);
          if (index !== undefined || index !== -1) {
            newPlaylists.push(playlists[index]);
          }
        });
      } else if (chosenPlaylists.length === 1) {
        let selectedPlaylist = playlists.filter(
          (p) => p.playlistId === chosenPlaylists[0]
        );
        let index = playlists.indexOf(selectedPlaylist[0]);
        if (index !== undefined || index !== -1) {
          newPlaylists.push(playlists[index]);
        }
      }
    }

    return newPlaylists;
  };

  const submit = () => {
    let mappedPlaylists = mapPlaylists();
    let formattedPlaylists = JSON.stringify(mappedPlaylists);
    dispatch(editSong(song.songId, name, artist, formattedPlaylists));
    dispatch(hideModal());
  };

  const cancel = () => {
    if (tempPlaylists.length > 0) {
      setChosenPlaylists(tempPlaylists);
      setTempPlaylists([]);
      submit();
    } else dispatch(hideModal());
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        style={styles.content}
        animationType="slide"
        transparent={true}
        visible={visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.formHeader}>Edit</Text>
            <Text>Name: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setName}
              defaultValue={name}
              value={name}
            />

            <Text>Artist: </Text>
            <TextInput
              style={styles.input}
              onChangeText={setArtist}
              defaultValue={artist}
              value={artist}
            />

            {playlists.length > 0 && (
              <View style={styles.playlistsBox}>
                <Text>Playlists: </Text>
                <MultiSelect
                  hideTags
                  items={playlists}
                  uniqueKey={"playlistId"}
                  onSelectedItemsChange={(selectedItems) => {
                    updatePlaylists(selectedItems);
                  }}
                  selectedItems={chosenPlaylists}
                  selectText="Select Playlists"
                  styleMainWrapper={{ width: 200, zIndex: 1000 }}
                  nestedScrollEnabled={true}
                  hideSubmitButton={true}
                />
              </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => cancel()}
              >
                <Text style={styles.textStyleCancel}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => submit()}
              >
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "70%",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "50%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: GREEN,
  },
  buttonClose: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: GREEN
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyleCancel: {
    color: GREEN,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    padding: 5,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 20,
    position: "absolute",
    zIndex: 1,
  },
});
