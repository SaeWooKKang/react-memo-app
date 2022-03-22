import React, { memo, useState } from "react";
import { go, each, map } from 'fxjs';

import { useSelector } from 'react-redux';

const InputBar = ({saveLocalAndStore}) => {
  const [inputText, setInputText] = useState('');

  const todoDatum = useSelector(({ memo }) => memo.todoDatum);

  const handleInputTextChange = ({target: {value}}) => setInputText(value);
  
  const handleAddNewTodoText = e => go(
    (e.preventDefault(), makeTodoObj(inputText)), //  [[{}]]
    each(saveLocalAndStore('todoDatum')), // [{}]
    each(_ => setInputText("")),
  );

  // 입력받은 text를 객체로 만들고,
  //  기존 state와 병합 
  const makeTodoObj = text => go(
    text ? [text] : [],
    map(t => ({ text: t, startDate: Date.now() })), // [{}]
    map(obj => [obj, ...todoDatum]), // [[{}]]
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
