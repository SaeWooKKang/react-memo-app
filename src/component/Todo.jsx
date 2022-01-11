import React from "react";

const Todo = ({ todoData }) => {
  const todo = todoData.text;
  return <div className="todo">{todo}</div>;
};

export default Todo;
