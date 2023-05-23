import { message } from "antd";
import { v4 } from "uuid";

// adding id and index in table rows
const tableRows = (rows) => {
  let arr = rows.map((row, index) => ({ ...row, id: v4(), index: index + 1 }));
  return arr;
};
// getting select options for normal select
const getSelectOptions = (rows) => {
  let arr = rows.map((row) => ({
    text: row.text,
    value: row.id,
  }));
  return arr;
};
// input handler for simple table inputs
const simpleInputHandler = (arr, name, value, id) => {
  arr = arr.map((row) => {
    let obj = row;
    if (row.id === id) {
      obj = {
        ...obj,
        [name]: value,
      };
      return obj;
    } else {
      return obj;
    }
  });
  return arr;
};
// validating table fields and making arrays of the table rows

const validateTableRows = (rows, validArr) => {
  let finalObj = {};
  for (var key in rows[0]) {
    finalObj[key] = [];
  }
  let arr = rows.map((row) => {
    let obj = row;
    let validRow = true;
    validArr.map((valid) => {
      if (obj[valid] === "") {
        validRow = false;
      }
    });
    if (!validRow) {
      obj = {
        ...obj,
        error: true,
      };
      message.error("Please enter all the values");
      return obj;
    } else {
      obj = {
        ...obj,
        error: false,
      };
    }

    for (var key in finalObj) {
      finalObj = {
        ...finalObj,
        [key]: [...finalObj[key], obj[key]],
      };
    }
    return obj;
  });

  delete finalObj["id"];
  delete finalObj["error"];
  return { ...finalObj, rows: arr };
};
export { tableRows, getSelectOptions, simpleInputHandler, validateTableRows };
