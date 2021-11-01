import React, { useSelector, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch } from "react-redux";
import { getSongs } from "../actions/songs";

export const Songs = () => {
  const [ songs, setSongs ] = []
  const songList = useSelector(state => state?.songs?.songs)
  const error = useSelector(state => state?.songs?.error)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(songList)
      dispatch(getSongs())
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
