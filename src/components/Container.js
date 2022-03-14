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

const Container = () => {
  const dispatch = useDispatch();

  const memo = useSelector(state => state.memo);
  const doneDatum = useSelector(state => state.memo.doneDatum);

  useEffect(() => getTodoDatum(), []);

  const getTodoDatum = useCallback(() => {
    dispatch(fetchLocalStorageData('todoDatum'));
    dispatch(fetchLocalStorageData('doneDatum'));
    dispatch(put({stateName: 'isLoading', value: false}));
  }, [dispatch]);
  
  // TodoList, CompletedList 사용
  const handleDeleteTodo = (key, datum, datumType) => {
    const copyDatum = [...datum]; // [{}, {}, ...]

    // 해당 데이터 지운 나머지 값들 
    const deletedDatum = copyDatum.filter(
      (data) => data.startDate !== Number(key)
    );
    // 삭제 된 {} 
    const deletedData = copyDatum.filter((a) => a.startDate === Number(key));
    
    // store 저장
    datumType === "todoDatum"
      ? dispatch(put({ stateName: 'todoDatum', value: deletedDatum }))
      : dispatch(put({ stateName: 'doneDatum', value: deletedDatum }));
    
    // localstorage 저장
    saveData(datumType, deletedDatum);

    return deletedData;
  };
  
  return memo.isLoading ? (
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
        <CompletedList doneDatum={ doneDatum } onDeleteTodo={ handleDeleteTodo } />
      </div>
    </div>
  );
};

export default Container;
