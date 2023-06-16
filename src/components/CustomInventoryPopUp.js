import React, { useEffect, useState } from "react";

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
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="bg-white rounded-lg p-6 z-20">
        <h2 className="text-lg font-bold mb-4">Update Inventory</h2>
        <table className="w-full mb-4">
          <thead>
            <tr>
              {tableFields.map((field) => (
                <th className="py-2 px-4 border-b" key={field}>
                  {field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((item, index) => (
              <tr key={index}>
                {tableFields.map((field) => (
                  <td className="py-2 px-4 border-b" key={field}>
                    {field.includes("STOCK" || "stock" || "Stock") ? (
                      <input
                        className="border border-black"
                        type="number"
                        min="0"
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
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={closeModal}
        >
          Close
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-5"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CustomInventoryPopUp;
