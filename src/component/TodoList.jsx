import React, { memo } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";

const TodoList = (props) => {
  const { onDeleteTodo, onDoneTodo, todoDatum } = props;

  const onClickRouter = ({ target }) => {
    const { id } = target.parentNode;

    if (target.matches("#delete")) {
      handleDeleteTodo(id);
    } else if (target.matches("#done")) {
      handleDoneTodo(id);
    }
  };
  const handleDeleteTodo = (id) => {
    onDeleteTodo(id, todoDatum, "todoDatum");
  };
  const handleDoneTodo = (id) => {
    onDoneTodo(id, todoDatum);
  };
  const copyDatum = [...todoDatum];
  const rows = [];
  let lastCategory = null;

  if (!copyDatum) return null;

  copyDatum.forEach((todoData, idx) => {
    if (todoData.todoDate !== lastCategory) {
      rows.push(<TodoDateRow date={todoData.startDate} key={idx} />);
    }
    rows.push(
      <div
        className="todoData"
        key={todoData.startDate}
        id={todoData.startDate}
      >
        <Todo todoData={todoData} />
        <ion-icon
          id="done"
          className="done"
          name="checkmark-circle-outline"
        ></ion-icon>
        <ion-icon
          id="delete"
          className="delete"
          name="close-circle-outline"
        ></ion-icon>
      </div>
    );
    lastCategory = todoData.todoDate;
  });
  return (
    <div onClick={onClickRouter} className="todoList">
      <div>{rows}</div>
    </div>
  );
};

export default memo(TodoList);
