import React, { useState, useEffect, useCallback } from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
import { compare, filter, parseAndSet } from "./fs";
import Loader from "../Loader";
import InputBar from "./InputBar";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

import { useDispatch, useSelector } from 'react-redux';
import { isLoading } from '../redux/reducers/memoSlice';

const Container = () => {
  const [todoDatum, setTodoDatum] = useState([]);
  const [doneDatum, setDoneDatum] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const memo = useSelector(state => state.memo);

  useEffect(() => {
    getTodoDatum();
  }, []);

  const getTodoDatum = async () => {
    const getTodoDatum = localStorage.getItem("todoDatum");
    const getDoneDatum = localStorage.getItem("doneDatum");
    if (getTodoDatum) {
      parseAndSet(setTodoDatum, getTodoDatum);
    }
    if (getDoneDatum) {
      parseAndSet(setDoneDatum, getDoneDatum);
    }
    dispatch(isLoading(false));
  };
  const saveData = useCallback((name, todoDatum) => {
    localStorage.setItem(name, JSON.stringify(todoDatum));
  }, []);
  const handleAddNewTodoText = useCallback(
    (newTodoText) => {
      if (!newTodoText) return null;

      const newTodoData = {
        text: newTodoText,
        startDate: Date.now(),
      };

      const newTodoDatum = [...todoDatum];
      const arrayedTodoDatum = [...newTodoDatum, newTodoData].sort(
        compare("startDate")
      );
      setTodoDatum(arrayedTodoDatum);

      saveData("todoDatum", arrayedTodoDatum);
    },
    [todoDatum, saveData]
  );
  const handleDeleteTodo = useCallback(
    (key, datum, datumType) => {
      let copyDatum = [...datum];

      const deletedDatum = filter(
        (data) => data.startDate !== Number(key),
        copyDatum
      );
      const deletedData = filter((a) => a.startDate === Number(key), copyDatum);

      datumType === "todoDatum"
        ? setTodoDatum(deletedDatum)
        : setDoneDatum(deletedDatum);
      saveData(datumType, deletedDatum);

      return deletedData;
    },
    [saveData]
  );
  const handleDoneTodo = useCallback(
    (key, todoDatum) => {
      let doneTodo = handleDeleteTodo(key, todoDatum, "todoDatum");
      doneTodo[0].doneDate = Date.now();
      let newDoneTodo = [...doneDatum, ...doneTodo].sort(compare("doneDate"));

      saveData("doneDatum", newDoneTodo);
      setDoneDatum(newDoneTodo);
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
        <InputBar onAddNewTodoText={handleAddNewTodoText} />
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
