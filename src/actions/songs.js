import {
  GET_SONGS,
  GET_SONGS_SUCCESS,
  GET_SONGS_FAILURE,
  CREATE_TABLES,
  CREATE_TABLES_SUCCESS,
  CREATE_TABLES_FAILURE,
  ADD_SONG,
  ADD_SONG_SUCCESS,
  ADD_SONG_FAILURE,
  CLEAR_CHANGED,
  DELETE_SONG,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_FAILURE,
} from "../util/constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.mediaPlayer");

export const createTables = () => {
  return (dispatch) => {
    dispatch({
      type: CREATE_TABLES,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS songs (songId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name STRING, artist STRING, location STRING );",
        null,
        (txObj, result) => {
          dispatch({
            type: CREATE_TABLES_SUCCESS,
          });
        },
        (txObj, error) => {
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
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM songs",
        null,
        (txObj, { rows: { _array } }) => {
          dispatch({
            type: GET_SONGS_SUCCESS,
            response: _array,
          });
        },
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

export const addSong = ({ name, artist, location }) => {
  return (dispatch) => {
    dispatch({
      type: ADD_SONG,
    });
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO songs (name, artist, location) VALUES (?, ?, ?)",
        [name, artist, location],
        (txObj, resultSet) => {
          dispatch({
            type: ADD_SONG_SUCCESS,
            data: resultSet,
          });
        },
        (txObj, error) => {
          dispatch({
            type: ADD_SONG_FAILURE,
            error: "whoops, no songs for you",
          });
        }
      );
    });
  };
};

export const clearChanged = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CHANGED,
    });
  };
};

export const editSong = (song) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SONG,
    });
    return db.transaction((tx) => {
      // sending 4 arguments in executeSql
      tx.executeSql(
        tx.executeSql(
          "UPDATE songs SET name = ?, artist = ? WHERE songId = ?",
          [song.name, song.artist, song.songId],
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
        )
      );
    });
  };
};

export const deleteSong = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_SONG,
    });
    return db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM songs WHERE songId = ?",
          [id],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              dispatch({
                type: DELETE_SONG_SUCCESS,
              });
            } else {
              dispatch({
                type: DELETE_SONG_FAILURE,
                error: "Failed to delete song",
              });
            }
          },
          (txObj, error) => {
            dispatch({
              type: DELETE_SONG_FAILURE,
              error: "Failed to delete song",
            });
          }
        )
    });
  };
};
