import { PureComponent } from "react";

class InputBar extends PureComponent {
  handleInputTextChange = (e) => {
    this.props.onInputTextChange(e.target.value);
  };
  handleAddNewTodoText = (e) => {
    this.props.onAddNewTodoText();
    e.preventDefault();
  };
  render() {
    return (
      <form className="inputBar" onSubmit={this.handleAddNewTodoText}>
        <input
          className="input"
          type="text"
          placeholder="Write to do!"
          value={this.props.newTodoText}
          onChange={this.handleInputTextChange}
        />
        <ion-icon
          id="add"
          name="add-outline"
          onClick={this.handleAddNewTodoText}
        ></ion-icon>
      </form>
    );
  }
}

export default InputBar;
