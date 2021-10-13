import {
  GET_SONGS,
  GET_SONGS_SUCCESS,
  GET_SONGS_FAILURE,
} from "../util/constants";
import MSSQL from "react-native-mssql";
import { config } from "../util/config";

export const getSongs = () => {
  const getSongsQuery = `SELECT * FROM Songs`;
  return (dispatch) => {
    dispatch({
      type: GET_SONGS,
    });
    const connected = MSSQL.connect(config);
    if (connected) {
      dispatch(MSSQL.executeQuery(getSongsQuery))
        .then((result) => {
          dispatch({
            type: GET_SONGS_SUCCESS,
            response: JSON.stringify(result),
          });
        })
        .catch((e) => {
          dispatch({
            type: GET_SONGS_FAILURE,
            error: result,
          });
        });
    }
    MSSQL.close();
  };
};

export const getSongsSuccess = () => ({ type: GET_SONGS_SUCCESS, response });
export const getSongsFailure = () => ({ type: GET_SONGS_FAILURE, error });
