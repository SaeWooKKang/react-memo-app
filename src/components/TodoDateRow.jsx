import React, { memo } from "react";
import { makeDate } from "./fs";

const TodoDateRow = ({ date }) => {
  const { year, month } = makeDate(date);

  return <div className="todoDateRow">{`${year}.${month}`}</div>;
};

export default memo(TodoDateRow);
