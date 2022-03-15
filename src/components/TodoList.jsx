import React, { memo, useCallback } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";
import {compare} from './fs';

import { useDispatch, useSelector } from 'react-redux';
import { put } from '../redux/reducers/memoSlice';
import {saveData} from './fs';

const TodoList = props => {
  const { onDeleteTodo } = props;

  const todoDatum = useSelector(state => state.memo.todoDatum);
  const doneDatum = useSelector(state => state.memo.doneDatum);
  
  const dispatch = useDispatch();

  const onClickRouter = ({ target }) => {
    const { id } = target.parentNode;

    if (target.matches("#delete")) {
      handleDeleteTodo(id);
    } else if (target.matches("#done")) {
      handleDoneTodo(id);
    }
  };

  const handleDeleteTodo = useCallback((id) => {
    onDeleteTodo(id, todoDatum, "todoDatum");
    }, [onDeleteTodo, todoDatum]
  );

  const onDoneTodo = useCallback(
    (key, todoDatum) => {
      let doneTodo = handleDeleteTodo(key, todoDatum, "todoDatum"); // [{}]

      doneTodo = todoDatum.filter((a) => a.startDate === Number(key));

      doneTodo.doneDate = Date.now();
      const newDoneTodo = [...doneTodo, ...doneDatum].sort(compare("doneDate"));
      
      dispatch(put({ stateName: 'doneDatum', value: newDoneTodo }));
      saveData("doneDatum", newDoneTodo);
    },
    [handleDeleteTodo, doneDatum, dispatch]
  );

  const handleDoneTodo = (id) => {
    onDoneTodo(id, todoDatum);
  };

  const copyDatum = [...todoDatum];
  const rows = [];
  let lastCategory = null;

  if (!copyDatum) return null;

  copyDatum.forEach((todoData, idx) => {
    if (todoData.todoDate !== lastCategory) {
      rows.push(<TodoDateRow date={ todoData.startDate } key={ idx } />);
    }
    rows.push(
      <div
        className="todoData"
        key={ todoData.startDate }
        id={ todoData.startDate }
      >
        <Todo todoData={ todoData } />
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
    lastCategory = todoData.todoDate;
  });
  return (
    <div onClick={ onClickRouter } className="todoList">
      <div>{ rows }</div>
    </div>
  );
};

export default memo(TodoList);
