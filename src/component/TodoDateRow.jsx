import React, { memo } from "react";
import { makeDate } from "./fs";

const TodoDateRow = ({ date }) => {
  const today = makeDate(date);
  const { year, month } = today;
  console.log("TodoDateRow");
  return <div className="todoDateRow">{`${year}.${month}`}</div>;
};

export default memo(TodoDateRow);
