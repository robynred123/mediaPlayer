import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux';
import { View } from 'react-native'

import { Home } from './screens/Home';
import { Songs } from './screens/Songs';
import { Playlists } from './screens/Playlists';

export const Routes = () => {
  const Tab = createBottomTabNavigator();
  const loadingSongs = useSelector(state => state?.songs)
  const [ showLoading, setShowLoading] = useState(false)


  useEffect(() => {
    if(loadingSongs) {
      setShowLoading(true)
    }
    else {
      setShowLoading(false)
    }
  }, [loadingSongs])

  return (
    <>
      <View>
        <Spinner  
          visible={showLoading}
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
