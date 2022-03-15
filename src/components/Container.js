import React, { useEffect, useCallback } from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
import Loader from "../Loader";
import InputBar from "./InputBar";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

import { useDispatch, useSelector } from 'react-redux';
import { put, fetchLocalStorageData } from '../redux/reducers/memoSlice';

import { saveData } from './fs';
import { go, each, filter } from 'fxjs';
import * as L from "fxjs/Lazy";

const Container = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => state.memo);

  useEffect(() => getTodoDatum(), []);

  const getTodoDatum = useCallback(() => {
    dispatch(fetchLocalStorageData('todoDatum'));
    dispatch(fetchLocalStorageData('doneDatum'));
    dispatch(put({stateName: 'isLoading', value: false}));
  }, [dispatch]);

  // localStorage, state 저장
  const saveLocalAndStore = (dataType, newTexts) => go(
    [newTexts],
    each(saveData(dataType)),
    each(todos => dispatch(put( { stateName: dataType, value: todos } )))
  );
  
  // TodoList, CompletedList 사용
  const handleDeleteTodo = (key, datum, datumType) => {
    const deletedData = [];

    // 간결하게 표현했지만, 여전히 복잡도는 높음 -> 함수 분리할 것.
    const deletedDatum = filter(data => 
        data.startDate !== Number(key) 
          ? true 
          : (deletedData.push(data), false),
        datum
    );
    
    saveLocalAndStore(datumType, deletedDatum);

    return deletedData;
  };
  
  return isLoading ? (
    <div className="loader">
      <Loader />
    </div>
  ) : (
    <div className="container">
      <GlobalStyles />
      <div className="left">
        <InputBar />
        <TodoList onDeleteTodo={ handleDeleteTodo }/>
      </div>
      <div className="right">
        <CompletedList onDeleteTodo={ handleDeleteTodo } />
      </div>
    </div>
  );
};

export default Container;
