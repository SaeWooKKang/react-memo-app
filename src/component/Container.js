import React, { useState, useEffect, useCallback } from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
import { compare, filter, parseAndSet } from "./fs";
import Loader from "../Loader";
import InputBar from "./InputBar";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

const Container = () => {
  const [todoDatum, setTodoDatum] = useState([]);
  const [doneDatum, setDoneDatum] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodoDatum();
  }, []);

  const getTodoDatum = async () => {
    const getTodoDatum = localStorage.getItem("todos");
    const getDoneDatum = localStorage.getItem("doneTodos");

    if (getTodoDatum) {
      parseAndSet(setTodoDatum, getTodoDatum);
    }
    if (getDoneDatum) {
      parseAndSet(setDoneDatum, getDoneDatum);
    }
    setIsLoading(false);
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

      saveData("todos", arrayedTodoDatum);
    },
    [todoDatum, saveData]
  );
  const handleDeleteTodo = useCallback(
    (key, datum, datumType) => {
      let copyDatum = [...datum];

      const deletedDatum = filter(
        (a) => a.startDate !== Number(key),
        copyDatum
      );
      const deletedData = filter((a) => a.startDate === Number(key), copyDatum);

      datumType === "todoDatum"
        ? setTodoDatum(deletedDatum)
        : setDoneDatum(deletedDatum);
      saveData("todos", deletedDatum);

      return deletedData;
    },
    [saveData]
  );

  const handleDoneTodo = useCallback(
    (key, todoDatum) => {
      let doneTodo = handleDeleteTodo(key, todoDatum, "todoDatum");
      doneTodo[0].doneDate = Date.now();
      let newDoneTodo = [...doneDatum, ...doneTodo].sort(compare("doneDate"));

      saveData("doneTodos", newDoneTodo);
      setDoneDatum(newDoneTodo);
    },
    [handleDeleteTodo, doneDatum, saveData]
  );
  console.log("Contianer component");
  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <GlobalStyles />
      <div className="left">
        <InputBar onAddNewTodoText={handleAddNewTodoText} />
        <TodoList
          onAddNewTodoText={handleAddNewTodoText}
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
