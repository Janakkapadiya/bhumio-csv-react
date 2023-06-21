import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

const CustomInventoryPopUp = ({ setUpdateModel, values, setValues }) => {
  const closeModal = () => {
    setUpdateModel(false);
  };

  const [updatedValues, setUpdatedValues] = useState("");

  const handleStockChange = (partNumber, pathN, location, e) => {
    e.preventDefault();
    const stockValue = parseInt(e.target.value);
    const updatedValuesData = values.map((item) => {
      if (item["Part #"] === partNumber && item["Model"] === pathN) {
        return {
          ...item,
          [location]: stockValue.toFixed(3),
        };
      }
      return item;
    });
    setUpdatedValues(updatedValuesData);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setValues(updatedValues);
    closeModal();
  };

  const tableFields = [
    "Part #",
    "Alt.Part#",
    "Model",
    "LOCATION A STOCK",
    "LOC B STOCK ",
  ];

  return (
    <Dialog open={true} onClose={closeModal} fullWidth maxWidth="md">
      <DialogTitle>Update Inventory</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              {tableFields.map((field) => (
                <TableCell key={field}>{field}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {values.map((item, index) => (
              <TableRow key={index}>
                {tableFields.map((field) => (
                  <TableCell key={field}>
                    {field.includes("STOCK" || "stock" || "Stock") ? (
                      <TextField
                        variant="outlined"
                        type="number"
                        inputProps={{ min: "0" }}
                        placeholder="0.000"
                        value={updatedValues[index]?.[field] || item[field]}
                        onChange={(e) =>
                          handleStockChange(
                            item["Part #"],
                            item["Model"],
                            field,
                            e
                          )
                        }
                      />
                    ) : (
                      item[field]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomInventoryPopUp;
