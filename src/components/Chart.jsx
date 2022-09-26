import React, { useEffect, useState } from "react";
import axios from "axios";

function Chart(props) {
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);

  async function getData() {
    const dataFileURL = "http://react.localhost.com:8000/charts";
    //const dataFileURL = "./data/Zone-data.csv";
    const result = await axios.get(dataFileURL);
    //console.log("result is : ", result);
    const { data } = await result;
    const raw = data.split("\n");

    //setting Header
    setHeader(raw[0].split(","));
    // console.log("Header: ", header);
    //setting Rows
    setRows(raw.slice(1));
    // console.log("rows", rows);
  }

  useEffect(() => {
    getData();
  }, []);

  // rows.forEach((row) => {
  //   const cols = row.split(",").slice(0, 2);
  //   arrData.push(col);
  // })
  console.clear();
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
