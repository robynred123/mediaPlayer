import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native'

import { Home } from './screens/Home';
import { Songs } from './screens/Songs';
import { Playlists } from './screens/Playlists';
import { createTables, getSongs } from '../src/actions/songs'

export const Routes = () => {
  const Tab = createBottomTabNavigator();
  const loadingSongs = useSelector(state => state?.songs?.loading)
  const tablesCreated = useSelector(state => state?.songs?.tablesCreated)
  const songList = useSelector(state => state?.songs.songList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(createTables())
  }, [])
  

  useEffect(() => {
    if(tablesCreated && songList === null) {
      dispatch(getSongs())
    }
    console.log(songList)
  }, [loadingSongs])

  return (
    <>
      <View>
        <Spinner  
          visible={loadingSongs}
          textContent={'Loading'}
        />
      </View>
    
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Songs') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          }
          else if (route.name === 'Playlists') {
                iconName = focused ? 'list-circle' : 'list-circle-outline';
              }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#30C169',
        tabBarInactiveTintColor: '#585858',
      })}
      >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Songs' component={Songs} />
        <Tab.Screen name='Playlists' component={Playlists} />
      </Tab.Navigator>
    </NavigationContainer>
    </>
  );
};
