import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as songActions from "../actions/songs";

export const Songs = () => {
  const [ songs, setSongs ] = []
  const songList = []//useSelector(state => state?.songs?.songList)
  const dispatch = useDispatch()

  useEffect(() => {
    const { getSongs } = songActions
      dispatch(getSongs())
}, [])

useEffect(() => {
  if(songList && 
    songs &&
    songList?.length !== songs.length) {
    setSongs(songList)
  }
}, [songList])

  return (
    <View>
      <Text>Songs</Text>
    </View>
  );
}; 
