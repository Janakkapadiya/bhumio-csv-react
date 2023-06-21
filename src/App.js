import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { TextField, Button, Input, FormControl } from "@material-ui/core";
import { Box } from "@mui/system";
import {
  TableRow,
  Table,
  TableHead,
  TableBody,
  TableCell,
} from "@mui/material";
import CustomInventoryPopUp from "./components/CustomInventoryPopUp";

const App = () => {
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [filteredValues, setFilteredValues] = useState("");
  const [updateModel, setUpdateModel] = useState(false);
  const [error, setError] = useState("");

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

    // filter number length should be grater or equals to 3

    if (filterText[0].trim().length < 3) {
      setError("User input length should be greater than or equal to 3.");
    } else {
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
    }
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setFilteredValues("");
    setError("");
    setValues(parsedData);
  };

  useEffect(() => {
    setValues(parsedData);
  }, [parsedData]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>REACT JS CSV IMPORT</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        <Input
          type="file"
          name="file"
          accept=".csv"
          onChange={handleOnChange}
        />
        <TextField
          size="small"
          label="Search"
          variant="outlined"
          placeholder="Enter filter keywords"
          value={filteredValues}
          onChange={handleFilterChange}
          style={{ marginLeft: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={filterHandler}
        >
          Filter
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={resetFilter}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px" }}
          onClick={(e) => {
            e.preventDefault();
            setUpdateModel(true);
          }}
        >
          Update Inventory
        </Button>
        {error && (
          <div
            style={{ color: "red", display: "flex", justifyContent: "center" }}
          >
            {error}
          </div>
        )}
      </Box>
      <FormControl>
        <Table
          sx={{
            border: 2,
            // minWidth: 250,
            marginLeft: "6px",
            marginRight: "95px",
          }}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              {tableRows.map((row, index) => (
                <TableCell key={index}>{row}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((value, index) => (
              <TableRow
                sx={{
                  "&:nth-child(even)": {
                    backgroundColor: "lightgray",
                  },
                }}
                key={index}
              >
                {Object.values(value).map((val, i) => (
                  <TableCell
                    sx={{
                      textAlign: "left",
                      borderLeft: 0,
                      borderRight: 0,
                      borderTop: 1,
                      borderBottom: 1,
                    }}
                    key={i}
                  >
                    {val}
                  </TableCell>
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    marginLeft: "4px",
                    borderRadius: "5px",
                    marginTop: "10px",
                  }}
                  onClick={(e) => handleDelete(index, e)}
                >
                  Delete
                </Button>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FormControl>
      {updateModel && (
        <CustomInventoryPopUp
          setUpdateModel={setUpdateModel}
          values={values}
          setValues={setValues}
        ></CustomInventoryPopUp>
      )}
    </Box>
  );
};

export default App;
