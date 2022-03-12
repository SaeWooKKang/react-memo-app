import React, { memo, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import {setTodoDatum} from '../redux/reducers/memoSlice';

import {compare} from './fs';
import { saveData } from '../redux/fs';

const InputBar = () => {
  // const { onAddNewTodoText } = props;
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch();
  const todoDatum = useSelector((state) =>state.memo.todoDatum);

  console.log('todoDatum', todoDatum);

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };
  const handleAddNewTodoText = (e) => {
    onAddNewTodoText(inputText);
    e.preventDefault();
    setInputText("");
  };

  const onAddNewTodoText = (newTodoText) => {

    if (!newTodoText) return null;

    const newTodoData = {
      text: newTodoText,
      startDate: Date.now(),
      doneDate: null,
    };

    const arrayedTodoDatum = [newTodoData, ...todoDatum].sort(
      compare("startDate")
    );

    dispatch(setTodoDatum([newTodoData])); // [{}, {}, {}}]

    saveData("todoDatum", arrayedTodoDatum);
  }
  
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
