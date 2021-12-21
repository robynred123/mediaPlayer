import { setSelectedSong } from "../actions/songs";
import { useDispatch } from "react-redux";

export const onPressDirection = (direction, songList, selectedSong, dispatch) => {
  if (songList && selectedSong) {
    let currentSong = selectedSong.songId;
    let currentIndex = songList.findIndex((s) => s.songId === currentSong);

    switch (direction) {
      case "forward":
        let nextSong = songList[currentIndex + 1];
        if (!nextSong) {
          let firstSong = songList[0];
          return dispatch(setSelectedSong(firstSong));
        } 
        else dispatch(setSelectedSong(nextSong));
        break;

      case "backward":
        let previousSong = songList[currentIndex - 1];
        if (!previousSong) {
          let lastSong = songList[songList.length - 1];
          return dispatch(setSelectedSong(lastSong));
        } 
        else dispatch(setSelectedSong(previousSong));
        break;

      default:
        break;
    }
  }
};
