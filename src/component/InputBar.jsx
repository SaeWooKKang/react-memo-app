import React, { memo } from "react";

const InputBar = memo((props) => {
  const { onInputTextChange, onAddNewTodoText, newTodoText } = props;

  const handleInputTextChange = (e) => {
    onInputTextChange(e.target.value);
  };
  const handleAddNewTodoText = (e) => {
    onAddNewTodoText();
    e.preventDefault();
  };

  return (
    <form className="inputBar" onSubmit={handleAddNewTodoText}>
      <input
        className="input"
        type="text"
        placeholder="Write to do!"
        value={newTodoText}
        onChange={handleInputTextChange}
      />
      <ion-icon
        id="add"
        name="add-outline"
        onClick={handleAddNewTodoText}
      ></ion-icon>
    </form>
  );
});

export default InputBar;
