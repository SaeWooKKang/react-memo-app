import React, { useState, useEffect } from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
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
      const pasredTodoDatum = await JSON.parse(getTodoDatum);
      setTodoDatum(pasredTodoDatum);
    }
    if (getDoneDatum) {
      const parsedDoneDatum = await JSON.parse(getDoneDatum);
      setDoneDatum(parsedDoneDatum);
    }
    setIsLoading(false);
  };
  const compare = (key) => (a, b) =>
    a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;

  const saveData = (name, todoDatum) => {
    window.localStorage.setItem(name, JSON.stringify(todoDatum));
  };
  const handleInputTextChange = (newTodoText) => {
    setNewTodoText(newTodoText);
  };
  const handleAddNewTodoText = () => {
    if (!newTodoText) return;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const newTodoData = {
      todoDate: `${year}.${month}`,
      text: newTodoText,
      id: Date.now(),
    };

    const newTodoDatum = todoDatum;
    const arrayedTodoDatum = [...newTodoDatum, newTodoData].sort(compare("id"));
    setTodoDatum(arrayedTodoDatum);
    setNewTodoText("");

    saveData("todos", arrayedTodoDatum);
  };
  const handleDeleteTodo = (key, datumType) => {
    if (datumType === "todoDatum") {
      let copyDatum = [...todoDatum];
      const index = copyDatum.findIndex(
        (todoData) => todoData.id === Number(key)
      );

      const deletedData = copyDatum.splice(index, 1);
      setTodoDatum(copyDatum);

      saveData("todos", copyDatum);
      return deletedData;
    } else if (datumType === "doneDatum") {
      let copyDatum = [...doneDatum];
      const index = copyDatum.findIndex(
        (todoData) => todoData.id === Number(key)
      );

      copyDatum.splice(index, 1);
      setDoneDatum(copyDatum);

      saveData("doneTodos", copyDatum);
    }
  };
  const handleDoneTodo = (key) => {
    let doneTodo = handleDeleteTodo(key, "todoDatum");
    doneTodo[0].doneDate = Date.now();
    let newDoneTodo = [...doneDatum, ...doneTodo].sort(compare("doneDate"));

    saveData("doneTodos", newDoneTodo);
    setDoneDatum(newDoneTodo);
  };
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
