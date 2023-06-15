import React, { useState } from "react";
import Papa from "papaparse";

const App = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState("");

  const handleOnChange = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rowsArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setParsedData(results.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });
  };

  const handleDelete = (index, e) => {
    e.preventDefault();
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
  };

  const handleFilterChange = (e) => {
    setFilteredValues(e.target.value);
  };

  const filterHandler = (e) => {
    e.preventDefault();
    let newRows = [];
    const filterText = filteredValues.split(",");
    filterText.forEach((text) => {
      console.log(text);
      console.log(text.trim());
      newRows.push(
        ...values.filter(
          (data) =>
            data[0].includes(text.trim()) || data[1].includes(text.trim())
        )
      );
      console.log(newRows);
    });
    setValues(newRows);
  };

  return (
    <div>
      <div className="text-center">
        <h1>REACT JS CSV IMPORT</h1>
        <form>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleOnChange}
            className="my-5 ml-20"
          />
          <span>
            <input
              type="text"
              name="text"
              placeholder=" enter filter keywords"
              className="rounded-sm outline-1 outline outline-offset-0"
              value={filteredValues}
              onChange={handleFilterChange}
            />
            <button
              onClick={filterHandler}
              className="ml-4 rounded-sm bg-gray-300 outline-1 outline outline-offset-0"
            >
              <span className="mx-2">filter</span>
            </button>
          </span>
          <table className="w-auto ml-14 border mr-14">
            <thead>
              <tr className="even:bg-slate-500">
                {tableRows.map((rows, index) => {
                  return (
                    <th className="border-b-2 text-left p-2" key={index}>
                      {rows}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => {
                return (
                  <tr className="even:bg-slate-200" key={index}>
                    {value.map((val, i) => {
                      return (
                        <td className="border-b-2 text-left p-2" key={i}>
                          {val}
                        </td>
                      );
                    })}
                    <button
                      className="rounded-sm bg-red-500 outline-1 outline outline-offset-0 text-center inline-block justify-center mt-2"
                      onClick={(e) => handleDelete(index, e)}
                    >
                      <span className="mx-2">delete</span>
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default App;
