import React from "react";

class TodoDateRow extends React.Component {
  render() {
    const date = this.props.date;

    return <div className="todoDateRow">{date}</div>;
  }
}

export default TodoDateRow;
