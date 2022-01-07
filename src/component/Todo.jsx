import { PureComponent } from "react";

class Todo extends PureComponent {
  render() {
    const todo = this.props.todoData.text;
    return <div className="todo">{todo}</div>;
  }
}

export default Todo;
