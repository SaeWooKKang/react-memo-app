import React from "react";
import GlobalStyles from "../GlobalStyles";
import "../css/style.scss";
import Loader from "../Loader";
import InputBar from "./InputBar";
import TodoList from "./TodoList";
import CompletedList from "./CompletedList";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoText: "",
      todoDatum: [],
      doneDatum: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getTodoDatum();
  }
  getTodoDatum = async () => {
    const getTodoDatum = localStorage.getItem("todos");
    const getDoneDatum = localStorage.getItem("doneTodos");

    if (getTodoDatum) {
      const pasredTodoDatum = await JSON.parse(getTodoDatum);
      this.setState({
        todoDatum: pasredTodoDatum,
      });
    }
    if (getDoneDatum) {
      const parsedDoneDatum = await JSON.parse(getDoneDatum);
      this.setState({
        doneDatum: parsedDoneDatum,
      });
    }
    this.setState({
      isLoading: false,
    });
  };
  compare(key) {
    return (a, b) => (a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0);
  }
  saveData(name, todoDatum) {
    window.localStorage.setItem(name, JSON.stringify(todoDatum));
  }
  handleInputTextChange = (newTodoText) => {
    this.setState({
      newTodoText: newTodoText,
    });
  };
  handleAddNewTodoText = () => {
    const { newTodoText, todoDatum } = this.state;

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
    const arrayedTodoDatum = [...newTodoDatum, newTodoData].sort(
      this.compare("id")
    );

    this.setState({
      todoDatum: arrayedTodoDatum,
      newTodoText: "",
    });
    this.saveData("todos", arrayedTodoDatum);
  };
  handleDeleteTodo = (key, datumType) => {
    const { todoDatum, doneDatum } = this.state;

    if (datumType === "todoDatum") {
      let copyDatum = [...todoDatum];
      const index = copyDatum.findIndex(
        (todoData) => todoData.id === Number(key)
      );

      const deletedData = copyDatum.splice(index, 1);

      this.setState({
        todoDatum: copyDatum,
      });

      this.saveData("todos", copyDatum);
      return deletedData;
    } else if (datumType === "doneDatum") {
      let copyDatum = [...doneDatum];
      const index = copyDatum.findIndex(
        (todoData) => todoData.id === Number(key)
      );

      copyDatum.splice(index, 1);

      this.setState({
        doneDatum: copyDatum,
      });

      this.saveData("doneTodos", copyDatum);
    }
  };
  handleDoneTodo = (key) => {
    let doneTodo = this.handleDeleteTodo(key, "todoDatum");
    doneTodo[0].doneDate = Date.now();
    let newDoneTodo = [...this.state.doneDatum, ...doneTodo].sort(
      this.compare("doneDate")
    );

    this.saveData("doneTodos", newDoneTodo);
    this.setState({
      doneDatum: newDoneTodo,
    });
  };
  render() {
    const { newTodoText, todoDatum, doneDatum } = this.state;

    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="container">
        <GlobalStyles />
        <div className="left">
          <InputBar
            newTodoText={newTodoText}
            onInputTextChange={this.handleInputTextChange}
            onAddNewTodoText={this.handleAddNewTodoText}
          />
          <TodoList
            newTodoText={newTodoText}
            onAddNewTodoText={this.handleAddNewTodoText}
            todoDatum={todoDatum}
            onDeleteTodo={this.handleDeleteTodo}
            onDoneTodo={this.handleDoneTodo}
          />
        </div>
        <div className="right">
          <CompletedList
            doneDatum={doneDatum}
            onDeleteTodo={this.handleDeleteTodo}
          />
        </div>
      </div>
    );
  }
}
export default Container;
