import React, { memo, useCallback } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";
import {compare} from './fs';

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

  // handleDeleteTodo는 props로 전달 받은 OnDeleteTodo를 실행하는데 반환을 안해서 값을 캐치 못했음..
  const onDoneTodo = useCallback(
    (key, todoDatum) => {

      // 완료된 데이터를 얻음
      const doneTodo = onDeleteTodo(key, todoDatum, "todoDatum"); // [{text: "1", startDate: 16, doneDate: null}] 

      // 참조에 의한 전달 지우기 -> 다른 멋진 방식이 있나 ?
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
  
  // 수정 해야할 부분
  const copyDatum = [...todoDatum];
  const rows = [];
  let lastCategory = null;

  copyDatum && copyDatum.forEach(({todoDate, startDate, text}) => {
    if (todoDate !== lastCategory) {
      rows.push(<TodoDateRow date={ startDate } key={ startDate + 10 } />);
    }
    rows.push(
      <div
        className="todoData"
        key={ startDate }
        id={ startDate }
      >
        <Todo todoText={ text } />
        <ion-icon
          id="done"
          className="done"
          name="checkmark-circle-outline"
        ></ion-icon>
        <ion-icon
          id="delete"
          className="delete"
          name="close-circle-outline"
        ></ion-icon>
      </div>
    );
    lastCategory = todoDate;
  });

  return (
    <div onClick={ onClickRouter } className="todoList">
      <div>{ rows }</div>
    </div>
  );
};

export default memo(TodoList);
