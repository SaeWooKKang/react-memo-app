import React, { useState, useEffect, useCallback } from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
import { compare, filter, parseAndSet, log } from "./fs";
import Loader from "../Loader";
import InputBar from "./InputBar";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

const Container = () => {
  const [newTodoText, setNewTodoText] = useState("");
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

  const saveData = (name, todoDatum) => {
    localStorage.setItem(name, JSON.stringify(todoDatum));
  };
  const handleInputTextChange = (newTodoText) => {
    setNewTodoText(newTodoText);
  };
  const handleAddNewTodoText = () => {
    if (!newTodoText) return null;

    const newTodoData = {
      text: newTodoText,
      startDate: Date.now(),
    };

    const newTodoDatum = [...todoDatum];
    const arrayedTodoDatum = [...newTodoDatum, newTodoData].sort(compare("id"));
    setTodoDatum(arrayedTodoDatum);
    setNewTodoText("");

    saveData("todos", arrayedTodoDatum);
  };
  const handleDeleteTodo = useCallback((key, datum, datumType) => {
    let copyDatum = [...datum];

    const deletedDatum = filter((a) => a.startDate !== Number(key), copyDatum);
    const deletedData = filter((a) => a.startDate === Number(key), copyDatum);

    datumType === "todoDatum"
      ? setTodoDatum(deletedDatum)
      : setDoneDatum(deletedDatum);
    saveData("todos", deletedDatum);

    return deletedData;
  }, []);

  const handleDoneTodo = useCallback(
    (key, todoDatum) => {
      let doneTodo = handleDeleteTodo(key, todoDatum, "todoDatum");
      log(doneTodo);
      doneTodo[0].doneDate = Date.now();
      let newDoneTodo = [...doneDatum, ...doneTodo].sort(compare("doneDate"));

      saveData("doneTodos", newDoneTodo);
      setDoneDatum(newDoneTodo);
    },
    [handleDeleteTodo, doneDatum]
  );
  console.log("Contianer component");
  return isLoading ? (
    <Loader />
  ) : (
    <div className="container">
      <GlobalStyles />
      <div className="left">
        <InputBar
          newTodoText={newTodoText}
          onInputTextChange={handleInputTextChange}
          onAddNewTodoText={handleAddNewTodoText}
        />
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