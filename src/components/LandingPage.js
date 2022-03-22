import React, { useEffect, useCallback } from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
import Loader from "../Loader";
import InputBar from "./InputBar";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

import { useDispatch, useSelector } from 'react-redux';
import { put, fetchLocalStorageData } from '../redux/reducers/memoSlice';

import { saveLocal } from './fs';
import { go, each, reject, curry } from 'fxjs';

const Container = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(state => state.memo);

  // localStorage 데이터 state에 저장
  const getTodoDatum = useCallback(() => {
    dispatch(fetchLocalStorageData('todoDatum'));
    dispatch(fetchLocalStorageData('doneDatum'));
    dispatch(put({stateName: 'isLoading', value: false}));
  }, [dispatch]);

  useEffect(() => getTodoDatum(), [getTodoDatum]);

  // localStorage, state 저장
  const saveLocalAndStore = curry((dataType, newTexts) => go(
    [newTexts], // [[{}]]
    each(saveLocal(dataType)),
    each(todos => dispatch(put( { stateName: dataType, value: todos } )))
  ));
  
  // TodoList, CompletedList 사용
  const handleDeleteTodo = useCallback((key, datum, datumType) => {
    const deletedData = [];

    // 삭제할 데이터를 push하고, 나머지 반환
    const deletedDatum = reject(data =>
      data.startDate === Number(key) ? (deletedData.push(data), true) : false, datum);
    
    saveLocalAndStore(datumType, deletedDatum);

    return deletedData;
  }, [saveLocalAndStore]);

  return isLoading 
    ? (<div className="loader"><Loader /></div>) 
    : (<div className="container">
        <GlobalStyles />
        <div className="left">
          <InputBar saveLocalAndStore={saveLocalAndStore}/>
          <TodoList 
            saveLocalAndStore={ saveLocalAndStore } onDeleteTodo={ handleDeleteTodo }/>
        </div>
        <div className="right">
          <CompletedList onDeleteTodo={ handleDeleteTodo } />
        </div>
      </div>);
};

export default Container;
