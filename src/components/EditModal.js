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
import DropDownPicker from 'react-native-dropdown-picker';

import { editSong } from '../actions/songs'
import { hideModal } from "../actions/app";

export const EditModal = ({ visible, song, playlists }) => {
  const [name, setName] = useState(song?.name);
  const [artist, setArtist] = useState(song?.artist);
  const [chosenPlaylists, setChosenPlaylists] = useState([])
  const [tempPlaylists, setTempPlaylists] = useState([])
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setName(song?.name)
    setArtist(song?.artist)
    if(song !== null && 
      song?.playlists !== "" && 
      song?.playlists !== undefined
      ) {
      let playlistsToArray = JSON.parse(song?.playlists)
      setChosenPlaylists(playlistsToArray)
    }
    
  }, [visible])

  useEffect(() => {
    if(chosenPlaylists.length > 0) {
      chosenPlaylists.map((c) => {
        let exists = playlists.filter((p) => p.playlistId === c.playlistId)
        if(!exists) {
          let index = chosenPlaylists.indexOf(c)
          let newArray = chosenPlaylists.splice(index)
          setTempPlaylists(newArray)
        }
      })
    }
  }, [chosenPlaylists])

  //these aren't working. Add error handling & play playlists
  const updatePlaylists = (playlist) => {
    console.log('PLAYLIST', playlist)
    if(chosenPlaylists.length > 0) {
      let exists = chosenPlaylists.filter((c) => c.playlistId === playlist.playlistId)
      if(exists) {
        let index = chosenPlaylists.indexOf(exists)
        let newArray = chosenPlaylists.splice(index)
        setChosenPlaylists(newArray)
      }
      else {
        let addTo = chosenPlaylists.push(playlist)
        setChosenPlaylists(addTo)
      }
    }
    else setChosenPlaylists(playlist)
  }

  const submit = () => {
    let formattedPlaylists = JSON.stringify(chosenPlaylists)
    dispatch(editSong(song.songId, name, artist, formattedPlaylists))
    dispatch(hideModal())
  }

  const cancel = () => {
    if(tempPlaylists.length > 0) {
      setChosenPlaylists(tempPlaylists)
      setTempPlaylists([])
      submit()
    }
    else dispatch(hideModal())
  }

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
              <DropDownPicker
              open={open}
              value={chosenPlaylists}
              multiple={true}
              items={playlists}
              schema={{
                label: 'name',
                value: 'playlistId'
              }}
              setOpen={() => setOpen(!open)}
              zIndex={3000}
              zIndexInverse={1000}
              setValue={(e) => { updatePlaylists(e)}}
            />
            </View>
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => cancel()}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
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
    width: '70%',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '50%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 20,
    position: 'absolute',
    zIndex: 1
  }
});
