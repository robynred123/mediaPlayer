import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";

export const EditModal = ({ visible, onCancel, onSubmit, song }) => {
  const [name, setName] = useState(song?.name);
  const [artist, setArtist] = useState(song?.artist);

  useEffect(() => {
    setName(song?.name)
    setArtist(song?.artist)
  }, [visible])

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

            <View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={onCancel}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={onSubmit}
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});
