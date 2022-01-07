import { PureComponent } from "react";

class TodoDateRow extends PureComponent {
  render() {
    const date = this.props.date;

    return <div className="todoDateRow">{date}</div>;
  }
}

export default TodoDateRow;
