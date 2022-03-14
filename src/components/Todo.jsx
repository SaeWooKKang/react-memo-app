import React, { memo } from "react";

const Todo = memo(({ todoData }) => {
  const todo = todoData.text;
  return <div className="todo">{ todo }</div>;
});

export default Todo;
