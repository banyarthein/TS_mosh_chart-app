import React, { useEffect, useState } from "react";

function Chart(props) {
  const [temp, setTemp] = useState([,]);

  async function getData() {
    //const dataFileURL = "https://jsonplaceholder.typicode.com/users";
    const dataFileURL = "./data/Zone-data.csv";
    //const dataFileURL = "testdata.csv";
    const result = await fetch(dataFileURL);
    //console.log("result : ", result);
    const data = await result.text();
    //console.log("data : ", data);
    const rows = data.split("\n").slice(1);
    //console.log("rows : ", rows);

    let arrData = [,];

    rows.forEach((row) => {
      const col = row.split(",").slice(0, 2);
      arrData.push(col);
    });

    setTemp(arrData);
    console.log("arrData:  ", arrData);
    console.log("temp:  ", temp);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ul>
        {temp.map((arr) => (
          <li key={arr[0]}>
            In {arr[0]}, the mean temperature is {arr[1]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chart;
