import { v4 } from "uuid";

const insertId = (arr) => {
  let arrWithId = arr.map((row, index) => ({
    index: index + 1,
    id: v4(),
    ...row,
  }));
  return arrWithId;
};

export { insertId };
