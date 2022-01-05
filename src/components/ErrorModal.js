import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { GREEN } from "../util/constants";

export const ErrorModal = ({ visible, errorMessage, onClose }) => {
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
            <Text style={styles.modalText}>A Problem Has Occurred</Text>
            <Text >{errorMessage}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.buttonOpen]}
                onPress={onClose}
              >
                <Text style={styles.textStyle}>Ok</Text>
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
    height: '25%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: GREEN,
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
    width: "100%",
    flexDirection: "row",
    justifyContent: 'center',
    bottom: 20,
    position: "absolute",
    zIndex: 1,
  },
});
