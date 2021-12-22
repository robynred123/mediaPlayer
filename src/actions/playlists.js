import { 
  GET_PLAYLISTS, 
  GET_PLAYLISTS_SUCCESS,
  GET_PLAYLISTS_FAILURE,
  ADD_PLAYLIST,
  ADD_PLAYLIST_SUCCESS, 
  ADD_PLAYLIST_FAILURE,
  CREATE_PLAYLIST_TABLE,
  CREATE_PLAYLIST_TABLE_SUCCESS,
  CREATE_PLAYLIST_TABLE_FAILURE,
} from "../util/constants";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.mediaPlayer");

export const createPlaylistTable = () => {
  return (dispatch) => {
    dispatch({
      type: CREATE_PLAYLIST_TABLE,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS playlists (playlistId INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name STRING);",
        null,
        (txObj, result) => {
          dispatch({
            type: CREATE_PLAYLIST_TABLE_SUCCESS,
          });
        },
        (txObj, error) => {
          dispatch({
            type: CREATE_PLAYLIST_TABLE_FAILURE,
            error: "whooops",
          });
        }
      );
    });
  };
};

export const getPlaylists = () => {
  return (dispatch) => {
    dispatch({
      type: GET_PLAYLISTS,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM playlists",
        null,
        (txObj, { rows: { _array } }) => {
          dispatch({
            type: GET_PLAYLISTS_SUCCESS,
            response: _array,
          });
        },
        (txObj, error) => {
          dispatch({
            type: GET_PLAYLISTS_FAILURE,
            error: "whoops, no playlsts for you",
          });
        }
      );
    });
  };
};

export const addPlaylist = ( name ) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PLAYLIST,
    });
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO playlists (name) VALUES (?)",
        [name],
        (txObj, resultSet) => {
          dispatch({
            type: ADD_PLAYLIST_SUCCESS,
            data: resultSet,
          });
        },
        (txObj, error) => {
          console.log(error)
          dispatch({
            type: ADD_PLAYLIST_FAILURE,
            error: error,
          });
        }
      );
    });
  };
};

export const deletePlaylist = (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PLAYLIST,
    });
    return db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM songs WHERE songId = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            dispatch({
              type: DELETE_PLAYLIST_SUCCESS,
            });
          } else {
            dispatch({
              type: DELETE_PLAYLIST_FAILURE,
              error: "Failed to delete song",
            });
          }
        },
        (txObj, error) => {
          dispatch({
            type: DELETE_PLAYLIST_FAILURE,
            error: "Failed to delete song",
          });
        }
      );
    });
  };
}