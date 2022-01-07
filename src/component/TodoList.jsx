import { PureComponent } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";

class TodoList extends PureComponent {
  handleDeleteTodo = ({ target }) => {
    if (!target.matches(".todoData>#delete")) return null;
    this.props.onDeleteTodo(target.parentNode.id, "todoDatum");
  };
  handleDoneTodo = ({ target }) => {
    if (!target.matches("div>#done")) return null;
    this.props.onDoneTodo(target.parentNode.id);
  };
  render() {
    const { todoDatum } = this.props;
    const todoDatum2 = todoDatum;
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
            id="delete"
            className="delete"
            name="close-circle-outline"
          ></ion-icon>
          <ion-icon
            id="done"
            className="done"
            name="checkmark-circle-outline"
          ></ion-icon>
        </div>
      );
      lastCategory = todoData.todoDate;
    });

    return (
      <div onClick={this.handleDeleteTodo} className="todoList">
        <div onClick={this.handleDoneTodo}>{rows}</div>
      </div>
    );
  }
}

export default TodoList;
