import React, { memo } from "react";
import { makeDate } from "./fs";

const TodoDateRow = memo(({ date }) => {
  const today = makeDate(date);
  const { year, month } = today;

  return <div className="todoDateRow">{`${year}.${month}`}</div>;
});

export default TodoDateRow;
