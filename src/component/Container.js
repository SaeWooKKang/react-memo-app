import React, { useState, useEffect, useCallback } from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
import { compare, filter, parseAndSet } from "./fs";
import Loader from "../Loader";
import InputBar from "./InputBar";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

import { useDispatch, useSelector } from 'react-redux';
import { isLoading, fetchLocalStorageData, setTodoDatum, setDoneDatum, deleteTodoDatum, deleteDoneDatum } from '../redux/reducers/memoSlice';

import {saveData} from '../redux/fs';

const Container = () => {
  // const [todoDatum, setTodoDatum] = useState([]);
  // const [doneDatum, setDoneDatum] = useState([]);

  const dispatch = useDispatch();
  const memo = useSelector(state => state.memo);
  
  const todoDatum = useSelector(state => state.memo.todoDatum);
  const doneDatum = useSelector(state => state.memo.doneDatum);

  useEffect(() => {
    getTodoDatum();
  }, []);

  const getTodoDatum = async () => {
    // const getTodoDatum = localStorage.getItem("todoDatum");
    dispatch(fetchLocalStorageData('todoDatum'));
    dispatch(fetchLocalStorageData('doneDatum'));
    // if (getTodoDatum) {
    //   parseAndSet(setTodoDatum, getTodoDatum);
    // }
    dispatch(isLoading(false));
  };
  
  const handleDeleteTodo = useCallback(
    (key, datum, datumType) => {
      let copyDatum = [...datum]; // [{}, {}, ...]

      // 해당 데이터 지운 나머지 값들 
      const deletedDatum = filter(
        (data) => data.startDate !== Number(key),
        copyDatum
      );
      // 삭제 된 {} 
      let deletedData = filter((a) => a.startDate === Number(key), copyDatum);

      console.log('확장가능 ?', Object.isExtensible(deletedData));

      datumType === "todoDatum"
        ? dispatch(deleteTodoDatum(deletedDatum))
        : dispatch(deleteDoneDatum(deletedDatum));
      saveData(datumType, deletedDatum);

      return deletedData;
    },
    [saveData]
  );
  
  const handleDoneTodo = useCallback(
    (key, todoDatum) => {
      let doneTodo = handleDeleteTodo(key, todoDatum, "todoDatum"); // [{}]

      console.log('doneTodo', doneTodo);
      
      console.log('확장가능 ?', Object.isExtensible(doneTodo[0]));

      
      doneTodo.doneDate = Date.now();
      let newDoneTodo = [...doneTodo, ...doneDatum].sort(compare("doneDate"));
      
      console.log('newDoneTodo', newDoneTodo)
      dispatch(setDoneDatum(newDoneTodo));
      saveData("doneDatum", newDoneTodo);
    },
    [handleDeleteTodo, doneDatum, saveData]
  );

  return memo.isLoading ? (
    <div className={"loader"}>
      <Loader />
    </div>
  ) : (
    <div className="container">
      <GlobalStyles />
      <div className="left">
        <InputBar />
        <TodoList
          todoDatum={todoDatum}
          onDeleteTodo={handleDeleteTodo}
          onDoneTodo={handleDoneTodo}
        />
      </div>
      <div className="right">
        <CompletedList doneDatum={doneDatum} onDeleteTodo={handleDeleteTodo} />
      </div>
    </div>
  );
};

export default Container;
