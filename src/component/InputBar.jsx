import React, { memo, useState } from "react";

const InputBar = (props) => {
  const { onAddNewTodoText } = props;
  const [inputText, setInputText] = useState("");

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };
  const handleAddNewTodoText = (e) => {
    onAddNewTodoText(inputText);
    e.preventDefault();
    setInputText("");
  };
  return (
    <form className="inputBar" onSubmit={handleAddNewTodoText}>
      <input
        className="input"
        type="text"
        placeholder="Write to do!"
        value={inputText}
        onChange={handleInputTextChange}
      />
      <ion-icon
        id="add"
        name="add-outline"
        onClick={handleAddNewTodoText}
      ></ion-icon>
    </form>
  );
};

export default memo(InputBar);
