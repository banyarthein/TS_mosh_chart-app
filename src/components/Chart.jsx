import React, { useEffect, useState } from "react";
import { getDataByAxio, getDataByFetch } from "../DTOs/dataaccess";



function Chart(props) {
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);

  const getData = async (dataFileURL) => {
    //const dataFileURL = "./data/Zone-data.csv";
    const data = await getDataByAxio(dataFileURL);
    //const data = await getDataByFetch(dataFileURL);
    const raw = data.split("\n");

    //setting Header
    setHeader(raw[0].split(","));
    console.log("Header: ", header);
    //setting Rows
    setRows(raw.slice(1));
    // console.log("rows", rows);
  }

  useEffect(() => {
    getData("http://react.localhost.com:8000/charts");
  }, []);

  // rows.forEach((row) => {
  //   const cols = row.split(",").slice(0, 2);
  //   arrData.push(col);
  // })
  return (
    <div>
      <h1 className="my-4">Temperatures by years</h1>
      <table className="table table-striped table-dark table-hover">
        <thead>
          <tr>
            {header.map((col) => (
              <th scope="col">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr>
              {row.split(",").map((val) => (
                <td>{val}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Chart;
