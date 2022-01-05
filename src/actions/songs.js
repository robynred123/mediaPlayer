import * as SQLite from "expo-sqlite";
import {
  GET_SONGS,
  GET_SONGS_SUCCESS,
  GET_SONGS_FAILURE,
  CREATE_SONG_TABLE,
  CREATE_SONG_TABLE_SUCCESS,
  CREATE_SONG_TABLE_FAILURE,
  ADD_SONG,
  ADD_SONG_SUCCESS,
  ADD_SONG_FAILURE,
  EDIT_SONG,
  EDIT_SONG_SUCCESS,
  EDIT_SONG_FAILURE,
  CLEAR_CHANGED,
  DELETE_SONG,
  DELETE_SONG_SUCCESS,
  DELETE_SONG_FAILURE,
  SELECT_SONG,
  SET_SONG_STATUS,
  DROP_TABLES,
  DROP_TABLES_SUCESS,
  DROP_TABLES_FAILURE,
  CLEAR_ERROR
} from "../util/constants";
import {
  CREATE_SONGS_TABLE_ERROR, 
  GET_SONGS_ERROR,
  DROP_TABLE_ERROR,
  ADD_SONG_ERROR,
  EDIT_SONG_ERROR,
  DELETE_SONG_ERROR
} from '../util/errorMessages'

const db = SQLite.openDatabase("db.mediaPlayer");

export const createSongTable = () => {
  return (dispatch) => {
    dispatch({
      type: CREATE_SONG_TABLE,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS songs (songId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name STRING, artist STRING, location STRING, playlists STRING);",
        null,
        (txObj, result) => {
          dispatch({
            type: CREATE_SONG_TABLE_SUCCESS,
          });
        },
        (txObj, error) => {
          dispatch({
            type: CREATE_SONG_TABLE_FAILURE,
            error: CREATE_SONGS_TABLE_ERROR
          });
        }
      );
    });
  };
};

export const dropTables = () => {
  return (dispatch) => {
    dispatch({
      type: DROP_TABLES,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE IF EXISTS songs; DROP TABLE IF EXISTS playlists;",
        null,
        (txObj, result) => {
          dispatch({
            type: DROP_TABLES_SUCESS,
          });
        },
        (txObj, error) => {
          dispatch({
            type: DROP_TABLES_FAILURE,
            error: DROP_TABLE_ERROR
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
            error: GET_SONGS_ERROR
          });
        }
      );
    });
  };
};

export const addSong = ({ name, artist, location, playlists }) => {
  return (dispatch) => {
    dispatch({
      type: ADD_SONG,
    });
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO songs (name, artist, location, playlists) VALUES (?, ?, ?, ?)",
        [name, artist, location, playlists],
        (txObj, resultSet) => {
          dispatch({
            type: ADD_SONG_SUCCESS,
            data: resultSet,
          });
        },
        (txObj, error) => {
          dispatch({
            type: ADD_SONG_FAILURE,
            error: ADD_SONG_ERROR
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

export const setSelectedSong = (song) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_SONG,
      payload: song,
    });
  };
};

export const editSong = (id, name, artist, playlists) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_SONG,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "UPDATE songs SET name = ?, artist = ?, playlists = ? WHERE songId = ?",
        [name, artist, playlists, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            dispatch({
              type: EDIT_SONG_SUCCESS,
            });
          } else {
            dispatch({
              type: EDIT_SONG_FAILURE,
              error: EDIT_SONG_ERROR
            });
          }
        },
        (txObj, error) => {
          console.log(error)
          dispatch({
            type: EDIT_SONG_FAILURE,
            error: EDIT_SONG_ERROR
          });
        }
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
              error: DELETE_SONG_ERROR
            });
          }
        },
        (txObj, error) => {
          dispatch({
            type: DELETE_SONG_FAILURE,
            error: DELETE_SONG_ERROR
          });
        }
      );
    });
  };
};

export const setSongStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: SET_SONG_STATUS,
      payload: status,
    });
  };
};

export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERROR
    })
  }
}
