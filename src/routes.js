import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, View } from "react-native";

import { Songs } from "./screens/Songs";
import { Playlists } from "./screens/Playlists";
import { PlaylistSongs } from "./screens/PlaylistSongs";
import { createSongTable, dropTables, getSongs, clearError } from "../src/actions/songs";
import { ErrorModal } from "./components/ErrorModal";
import { createPlaylistTable, getPlaylists } from "../src/actions/playlists";
import { Add } from "./screens/Add";
import { GREEN } from "./util/constants";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const tabNav = ({ navigation }) => {
  
  const dispatch = useDispatch()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Songs") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (route.name === "Playlists") {
            iconName = focused ? "list-circle" : "list-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: GREEN,
        tabBarInactiveTintColor: "#585858",
      })}
    >
      <Tab.Screen
        name="Songs"
        component={Songs}
        options={{
          headerTitle: "Songs",
          headerRight: () => (
            <View style={{ alignItems: "flex-end", marginRight: 20 }}>
               {/* For debugging - drops tables - allowing them to be recreated
              <TouchableOpacity onPress={() => dispatch(dropTables())}>
                <Ionicons name={"remove-circle"} size={40} color={GREEN} />
              </TouchableOpacity>*/}
              <TouchableOpacity onPress={() => navigation.navigate('Add', 'Songs')}>
                <Ionicons name={"add-circle"} size={40} color={GREEN} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          headerTitle: "Playlists",
          headerRight: () => (
            <View style={{ alignItems: "flex-end", marginRight: 20 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Add', 'Playlists')}>
                <Ionicons name={"add-circle"} size={40} color={GREEN} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Routes = () => {
  const loadingSongs = useSelector((state) => state?.songs?.loading);
  const songTableCreated = useSelector((state) => state?.songs?.songTableCreated);
  const songList = useSelector((state) => state?.songs.songList);
  const songError = useSelector((state) => state?.songs?.error)

  const playlistsList = useSelector((state) => state?.playlists?.playlists);
  const playlistTableCreated = useSelector((state) => state?.playlists?.playlistTableCreated);
  const playlistError = useSelector((state) => state?.playlists?.error)

  const [error, setError] = useState(null)

  const dispatch = useDispatch();

  useEffect(() => {
    //create db tables for songs & playlists
    if(!songTableCreated) {
      dispatch(createSongTable());
    }
    if(!playlistTableCreated) {
      dispatch(createPlaylistTable())
    }
  }, [songTableCreated, playlistTableCreated]);

  useEffect(() => {
    if (songTableCreated && songList === null) {
      dispatch(getSongs());
    }
    if(playlistTableCreated && playlistsList === null) {
      dispatch(getPlaylists());
    }
  }, [loadingSongs]);

  useEffect(() => {
    if(songError !== null || playlistError !== null) {
      setError(songError || playlistError)
    }
    else(setError(null))
  }, [songError, playlistError])

  return (
    <>
      <View>
        <Spinner visible={loadingSongs} textContent={"Loading"} />
        <ErrorModal errorMessage={error} visible={error ? true : false} onClose={() => dispatch(clearError())}/>
      </View>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={tabNav} />
          <Stack.Screen
            name="Add"
            component={Add}
            options={{
              headerShown: true,
              headerTitle: "Add New"
            }}
          />
          <Stack.Screen
            name="PlaylistSongs"
            component={PlaylistSongs}
            options={({ route }) => ({ title: route.params.playlistName, headerShown: true })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
