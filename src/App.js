import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import CustomInventoryPopUp from "./components/CustomInventoryPopUp";

const App = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState("");
  const [updateModel, setUpdateModel] = useState(false);

  const handleOnChange = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rowsArray = Object.keys(results.data[0]);
        const valuesArray = Object.values(results.data);

        setParsedData(valuesArray);
        setTableRows(rowsArray);
        console.log(valuesArray);
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
    const filterText = filteredValues.split(",");
    const filteredRows = parsedData.filter((data) => {
      for (const element of filterText) {
        const keyword = element.trim();
        if (Object.values(data).some((value) => value.includes(keyword))) {
          return true;
        }
      }
      return false;
    });
    setValues(filteredRows);
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setFilteredValues("");
    setValues(parsedData);
  };

  useEffect(() => {
    setValues(parsedData);
  }, [parsedData]);

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
            <button
              onClick={resetFilter}
              className="ml-4 rounded-sm bg-gray-300 outline-1 outline outline-offset-0"
            >
              <span className="mx-2">reset</span>
            </button>
            <button
              onClick={(e) => (e.preventDefault(), setUpdateModel(true))}
              className="ml-4 rounded-sm bg-gray-300 outline-1 outline outline-offset-0"
            >
              <span className="mx-2">Update Inventory</span>
            </button>
          </span>
          <table className="w-auto ml-14 border mr-14">
            <thead>
              <tr className="even:bg-slate-500">
                {tableRows.map((row, index) => (
                  <th className="border-b-2 text-left p-2" key={index}>
                    {row}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {values.map((value, index) => (
                <tr className="even:bg-slate-200" key={index}>
                  {Object.values(value).map((val, i) => (
                    <td className="border-b-2 text-left p-2" key={i}>
                      {val}
                    </td>
                  ))}
                  <button
                    className="rounded-sm bg-red-500 outline-1 outline outline-offset-0 text-center inline-block justify-center mt-2"
                    onClick={(e) => handleDelete(index, e)}
                  >
                    <span className="mx-2">delete</span>
                  </button>
                </tr>
              ))}
            </tbody>
          </table>
          {updateModel && (
            <CustomInventoryPopUp
              setUpdateModel={setUpdateModel}
              values={values}
              setValues={setValues}
            ></CustomInventoryPopUp>
          )}
        </form>
      </div>
    </div>
  );
};

export default App;
