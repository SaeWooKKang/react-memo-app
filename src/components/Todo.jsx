import React, { memo } from "react";

const Todo = memo(({ todoText }) => (
  <div className="todo">{ todoText }</div>))

export default Todo;
