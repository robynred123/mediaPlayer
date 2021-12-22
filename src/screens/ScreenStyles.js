import { StyleSheet } from "react-native";
import { GREEN } from "../util/constants";

export const styles = StyleSheet.create({
  content: {
    flexDirection: "column",
    height: "100%",
  },
  flatList: {
    width: "100%",
  },
  item: {
    flexDirection: "row",
    height: 30,
    alignContent: "center",
    paddingRight: 20,
    paddingLeft: 20,
  },
  iconContainer: {
    right: 0,
    position: "absolute",
    height: "100%",
    width: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icons: {
    color: GREEN,
  },
  musicPlayer: {
    position: 'absolute',
    bottom: 0
  }
});
