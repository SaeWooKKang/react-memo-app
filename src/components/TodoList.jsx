import React, { memo, useCallback } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";
import { compare, array, diffrent, push, YMD } from './fs';

import { useSelector } from 'react-redux';

import { go, map, each, entries, flat, object } from 'fxjs';

const TodoList = props => {
  const { onDeleteTodo, saveLocalAndStore } = props;

  const todoDatum = useSelector(({ memo }) => memo.todoDatum);
  const doneDatum = useSelector(({ memo }) => memo.doneDatum);

  const onClickRouter = ({ target }) => {
    const { id } = target.parentNode;

    target.matches("#delete") 
      ? onDeleteTodo(id, todoDatum, "todoDatum") 
      : target.matches("#done") && onDoneTodo(id, todoDatum);
  };

  const onDoneTodo = useCallback(
    (key, todoDatum) => {

      // 완료된 데이터를 얻음
      const doneTodo = onDeleteTodo(key, todoDatum, "todoDatum"); // [{text: "1", startDate: 16, doneDate: null}] 

      // 참조에 의한 전달 지우기
      let doneTodo2 = flat(map(entries, doneTodo)); // [ [], [] ]

      // 완료 날짜 추가
      doneTodo2.push(['doneDate', Date.now()]); // [ [], [], [] ]

      // 객체로 바꾸고, 기존 데이터 병합, 정렬 
      go(
        [doneTodo2], // [ [[], [], []] ]
        map(object), // [{}]
        map(obj => [obj, ...doneDatum]), // [ [{}, {} ...] ]
        each(arr => doneTodo2 = arr.sort(compare('doneDate'))) // [{}] 
      );
      
      // store에 put 하므로 데이터 가공해서 보내야 함 
      saveLocalAndStore('doneDatum', doneTodo2);
    },
    [onDeleteTodo, doneDatum, saveLocalAndStore]
  );

  let lastCategory = null;

  // [ <div>1</div>, <div>2</div> ]
  const tmpl = go(
    todoDatum,
    map(({ startDate, text }) => 
      go(
        array(
          diffrent(YMD(startDate, 2), lastCategory) 
            && <TodoDateRow date={ startDate } key={ startDate + 10 } />),
        each(_ => lastCategory = YMD(startDate, 2)), 
        push( 
          <div className="todoData" key={ startDate } id={ startDate }>
            <Todo todoText={ text } />
            <ion-icon id="done" className="done" name="checkmark-circle-outline"></ion-icon>
            <ion-icon id="delete" className="delete"name="close-circle-outline"></ion-icon>
          </div>))) 
  );

  return (
    <div onClick={ onClickRouter } className="todoList">
      <div>{ todoDatum && tmpl }</div>
    </div>
  );
};

export default memo(TodoList);
