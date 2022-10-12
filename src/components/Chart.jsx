import React, { useEffect, useState } from "react";
import { getDataByAxio, getDataByFetch } from "../DTOs/dataaccess";
import {Radio} from "antd"




function Chart(props) {
  const [header, setHeader] = useState([]);
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState('D');
  const [tableClass, setTableClass] = useState('table table-striped table-hover table-dark');

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

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    if(e.target.value == 'D')
    {
      setTableClass('table table-striped table-hover table-dark');
    }
    else
    {
      setTableClass('table table-striped table-hover');
    }
    // table-dark
  };


  // rows.forEach((row) => {
  //   const cols = row.split(",").slice(0, 2);
  //   arrData.push(col);
  // })
  return (
    <div>
      <h1 className="my-4">Temperatures by years</h1>

      <div className="my-4">
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={'D'} >Dark</Radio>
        <Radio value={'L'}>Light</Radio>
      </Radio.Group>
      </div>
      <table className={tableClass}>
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
