import {
  GET_SONGS,
  GET_SONGS_SUCCESS,
  GET_SONGS_FAILURE,
} from "../util/constants";
import MSSQL from "react-native-mssql";
import { config } from "../util/config";
import { getSongsDBConnect } from "../util/dbConnection";

export const getSongs = () => {
  return (dispatch) => {
    dispatch({
      type: GET_SONGS,
    });
    console.log('woo')
    try {
      const result = getSongsDBConnect();
      console.log('RESULT', result)
      dispatch({
        type: GET_SONGS_SUCCESS,
        response: JSON.stringify(result),
      });
    } catch {
      console.log('failure')
      dispatch({
        type: GET_SONGS_FAILURE,
        error: "whoops",
      });
    }
    MSSQL.close();
  };
};

export const getSongsSuccess = () => ({ type: GET_SONGS_SUCCESS, response });
export const getSongsFailure = () => ({ type: GET_SONGS_FAILURE, error });
