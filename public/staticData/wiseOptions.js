const wiseOptionsAll = [
  { text: "Date Wise", value: "range_date_wise" },
  { text: "Date Wise", value: "single_date_wise" },
  { text: "PO Wise", value: "po_wise" },
  { text: "Vendor Wise", value: "vendor_wise" },
  { text: "Effective Date Wise", value: "effective_date_wise" },
];

export default (wiseOptions) => {
  let arr = [];
  wiseOptions.map((opt) => {
    arr.push(wiseOptionsAll.filter((option) => option.value === opt)[0]);
  });
  return arr;
};
