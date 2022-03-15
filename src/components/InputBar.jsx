import React, { memo, useState } from "react";
import * as L from "fxjs/Lazy";
import { go, each, flat, curry } from 'fxjs';

import { useDispatch, useSelector } from 'react-redux';
import { put } from '../redux/reducers/memoSlice';

import { saveData } from './fs';

const InputBar = () => {
  const [inputText, setInputText] = useState("");

  const dispatch = useDispatch();
  const todoDatum = useSelector(state => state.memo.todoDatum);

   //  분리 하고 싶으나, dispatch 참조 문제로 안됨
  const saveLocalAndStore = curry((dataType, newTexts) => go(
    [newTexts],
    each(saveData(dataType)),
    each(todos => dispatch(put( { stateName: dataType, value: todos } )))
  ));

  const handleInputTextChange = e => {
    setInputText(e.target.value);
  };

  const handleAddNewTodoText = e => go(
      [makeTodoObj(inputText)], //  [[{}]]
      each(saveLocalAndStore('todoDatum')),
      each((_) => setInputText("")),
      each((_) => e.preventDefault())
  );

  const makeTodoObj = text => go(
      [text],
      L.map(t => ({ text: t, startDate: Date.now(), doneDate: null })), // {}
      L.map(obj => [obj, ...todoDatum]), // [{}]
      flat, // [{}]
  );

  return (
    <form className="inputBar" onSubmit={ handleAddNewTodoText }>
      <input
        className="input"
        type="text"
        placeholder="Write to do!"
        value={ inputText }
        onChange={ handleInputTextChange }
      />
      <ion-icon
        id="add"
        name="add-outline"
        onClick={ handleAddNewTodoText }
      ></ion-icon>
    </form>
  );
};

export default memo(InputBar);
