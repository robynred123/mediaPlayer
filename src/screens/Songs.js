import React, { useSelector, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { songActions } from "../actions";

export const Songs = () => {
  const [ songs, setSongs ] = []
  const [ loading, songList, error ] = useSelector(state => state?.songs)
  const dispatch = useDispatch()

  useEffect(() => {
    const { getSongList } = songActions
      dispatch(getSongList())
}, [])

useEffect(() => {
  if(songList && songList.length !== songs.length) {
    setSongs(songList)
  }
}, [songList])

  return (
    <View>
      <Text>Songs</Text>
    </View>
  );
}; 
