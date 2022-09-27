import axios from "axios";
import fetch from "node-fetch";

const getDataByAxio = async (requestURL) => {
    //const dataFileURL = "./data/Zone-data.csv";
    const result = await axios.get(requestURL);
    //console.log("result is : ", result);
    const { data } = await result;
    return data
  }

const getDataByFetch = async (requestURL) => {
    const result = await (await fetch(requestURL)).text();
    console.log("Fetch Result is ", result);
    return result;
    //return "Test data";
  };

export { getDataByAxio, getDataByFetch };