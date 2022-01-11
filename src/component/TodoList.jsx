import React from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";

const TodoList = (props) => {
  const { onDeleteTodo, onDoneTodo, todoDatum } = props;

  const onClickRouter = ({ target }) => {
    const { id } = target.parentNode;

    if (target.matches(".todoData>#delete")) {
      handleDeleteTodo(id);
    } else if (target.matches(".todoData>#done")) {
      handleDoneTodo(id);
    }
  };
  const handleDeleteTodo = (id) => {
    onDeleteTodo(id, "todoDatum");
  };
  const handleDoneTodo = (id) => {
    onDoneTodo(id);
  };
  const todoDatum2 = [...todoDatum];
  const rows = [];
  let lastCategory = null;

  if (!todoDatum2) return;

  todoDatum2.forEach((todoData) => {
    if (todoData.todoDate !== lastCategory) {
      rows.push(
        <TodoDateRow date={todoData.todoDate} key={todoData.todoDate} />
      );
    }
    rows.push(
      <div className="todoData" key={todoData.id} id={todoData.id}>
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

export default TodoList;
