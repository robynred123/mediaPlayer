import MSSQL from "react-native-mssql";
import { config } from "../util/config";

const getSongsQuery = `SELECT * FROM Songs`;

let connected = false

/*async function connect () {
  await MSSQL.connect(config)
  connected = true
}

async function disconnect () {
  await MSSQL.close();
  connected = false
}*/

export async function getSongsDBConnect () {
  console.log(connected)
  /*connect()
    if(connected === true) {
      const result = await MSSQL.executeQuery(getSongsQuery)
      return result
    }
  disconnect()*/
}