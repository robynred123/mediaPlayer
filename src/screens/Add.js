import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useSelector, useDispatch } from "react-redux";

import { addSong } from "../actions/songs";

export const Add = ({ navigation, route }) => {
  const history = route.params;
  const [file, setFile] = useState(null);
  const [uploading, startUploading] = useState(false);

  const dispatch = useDispatch();

  const getMimeType = (ext) => {
    // mime type mapping for few of the sample file types
    switch (ext) {
      case "mp3":
        return "audio/mpeg";
      case "jpg":
        return "image/jpeg";
    }
  };

  const pickFile = async () => {
    const mime = 'audio/*'
    let result = await DocumentPicker.getDocumentAsync({type:'audio/mpeg'}); 
    console.log(result);
    //if (!result.cancelled) {
      //setFile(result.uri);
    //}
  };

  const uploadFile = async () => {
    if (file) {
      const fileUri = file ? file : image;
      let filename = fileUri.split("/").pop();
      //let fileArtist =
      const extArr = /\.(\w+)$/.exec(filename);
      //const type = getMimeType(extArr[1]);
      setFile(null);
      startUploading(true);

      let song = {
        name: filename,
        //artist: fileArtist
        location: fileUri,
      };
      //let formData = new FormData();

      //formData.append("filetoupload", { uri: fileUri, name: filename, type });

      return dispatch(addSong(song));
    }
  };

  const renderView = () => {
    if (history === "songs") {
      return (
        <>
          <TouchableOpacity onPress={() => pickFile()}>
            <Text>Select a file</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => uploadFile()}>
            <Text>Upload</Text>
          </TouchableOpacity>
        </>
      );
    }
  };

  return (
    <View>
      <Text>Add</Text>
      {renderView()}
    </View>
  );
};
