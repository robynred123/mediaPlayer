import {
  GET_SONGS,
  GET_SONGS_SUCCESS,
  GET_SONGS_FAILURE,
  CREATE_TABLES,
  CREATE_TABLES_SUCCESS,
  CREATE_TABLES_FAILURE,
} from "../util/constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('db.mediaPlayer')

export const createTables = () => {
  return dispatch => {
    dispatch({
      type: CREATE_TABLES,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS songs (songId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name STRING, artist STRING, location STRING );",
        null,
        (txObj, result) => {
          dispatch({
            type: CREATE_TABLES_SUCCESS
          });
        },
        (txObj, error) => {
          console.log("Create Table Error ", error);
          dispatch({
            type: CREATE_TABLES_FAILURE,
            error: "whooops",
          });
        }
      );
    });
  };
};

export const getSongs = () => {
  return (dispatch) => {
    dispatch({
      type: GET_SONGS,
    })
    return db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        "SELECT * FROM songs",
        null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          dispatch({
            type: GET_SONGS_SUCCESS,
            response: _array,
          });
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => {
          dispatch({
            type: GET_SONGS_FAILURE,
            error: "whoops, no songs for you",
          });
        }
      );
    });
  };
};

export const addSong = ({name, artist, location, songs}) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO songs (name, artist, location) VALUES (?, ?, ?)', [name, artist, location],
      (txObj, resultSet) => { return responseObj.data = songs.concat({ id: resultSet.insertId, ...testSong}) },
      (txObj, error) => console.log('Error', error)
    )
  })
}

export const editSong = (song) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SONG,
    })
    return db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        tx.executeSql('UPDATE songs SET name = ?, artist = ? WHERE id = ?', [song.name, song.artist, song.songId],
        null, 
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          dispatch({
            type: EDIT_SONG_SUCCESS,
            response: _array,
          });
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => {
          dispatch({
            type: EDIT_SONG_FAILURE,
            error: "whoops, no songs for you",
          });
        }
      ))
    });
  };
};
