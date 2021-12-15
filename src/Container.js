import React from "react";
import GlobalStyles from "./GlobalStyles";
import "./style.scss";
import Loader from "./Loader";

class TodoDateRow extends React.Component {
  render() {
    const date = this.props.date;

    return <div className="todoDateRow">{date}</div>;
  }
}
class Todo extends React.Component {
  render() {
    const todo = this.props.todoData.text;
    return <div className="todo">{todo}</div>;
  }
}
class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleDoneTodo = this.handleDoneTodo.bind(this);
  }
  handleDeleteTodo({ target }) {
    if (!target.matches(".todoData>#delete")) return null;
    this.props.onDeleteTodo(target.parentNode.id, "todoDatum");
  }
  handleDoneTodo({ target }) {
    if (!target.matches("div>#done")) return null;
    this.props.onDoneTodo(target.parentNode.id);
  }
  render() {
    const rows = [];
    let lastCategory = null;

    if (!this.props.todoDatum) return;

    this.props.todoDatum.forEach((todoData) => {
      if (todoData.todoDate !== lastCategory) {
        rows.push(
          <TodoDateRow date={todoData.todoDate} key={todoData.todoDate} />
        );
      }
      rows.push(
        <div className="todoData" key={todoData.id} id={todoData.id}>
          <Todo todoData={todoData} />
          <ion-icon
            id="delete"
            className="delete"
            name="close-circle-outline"
          ></ion-icon>
          <ion-icon
            id="done"
            className="done"
            name="checkmark-circle-outline"
          ></ion-icon>
        </div>
      );
      lastCategory = todoData.todoDate;
    });

    return (
      <div onClick={this.handleDeleteTodo} className="todoList">
        <div onClick={this.handleDoneTodo}>{rows}</div>
      </div>
    );
  }
}
class InputBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleAddNewTodoText = this.handleAddNewTodoText.bind(this);
  }
  handleInputTextChange(e) {
    this.props.onInputTextChange(e.target.value);
  }
  handleAddNewTodoText(e) {
    this.props.onAddNewTodoText();
    e.preventDefault();
  }
  render() {
    return (
      <form className="inputBar" onSubmit={this.handleAddNewTodoText}>
        <input
          className="input"
          type="text"
          placeholder="Write to do!"
          value={this.props.newTodoText}
          onChange={this.handleInputTextChange}
        />
        <ion-icon
          id="add"
          name="add-outline"
          onClick={this.handleAddNewTodoText}
        ></ion-icon>
      </form>
    );
  }
}
class CompletedList extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
  }
  handleDeleteTodo({ target }) {
    if (!target.matches(".todoData>ion-icon")) return null;
    this.props.onDeleteTodo(target.parentNode.parentNode.id, "doneDatum");
  }
  render() {
    const rows = [];
    let lastCategory = "";
    this.props.doneDatum.forEach((doneData) => {
      const doneDate = new Date(doneData.doneDate);
      const DONE_YEAR = doneDate.getFullYear();
      const DONE_MONTH = doneDate.getMonth();
      const DONE_DATE = doneDate.getDate();

      const doneYearMonth = `${DONE_YEAR}.${DONE_MONTH + 1}`;
      const doneYearMonthDate = `${DONE_YEAR}.${DONE_MONTH + 1}.${DONE_DATE}`;

      const startDate = new Date(doneData.id);
      const startYearMonthDate = `${startDate.getFullYear()}.${
        startDate.getMonth() + 1
      }.${startDate.getDate()}`;

      if (doneYearMonth !== lastCategory) {
        rows.push(<TodoDateRow date={doneYearMonth} key={doneData.doneDate} />);
      }
      rows.push(
        <div key={doneData.id} onClick={this.handleDeleteTodo} id={doneData.id}>
          <div className="period">
            {startYearMonthDate}~{doneYearMonthDate}
          </div>
          <div className="todoData">
            <Todo todoData={doneData} />
            <ion-icon
              id="delete"
              name="close-circle-outline"
              className="delete"
            ></ion-icon>
          </div>
        </div>
      );
      lastCategory = doneYearMonth;
    });
    return (
      <div>
        <div className="title">Completed</div>
        <div className="doneList">{rows}</div>
      </div>
    );
  }
}
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoText: "",
      todoDatum: [],
      doneDatum: [],
      isLoading: true,
    };

    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleAddNewTodoText = this.handleAddNewTodoText.bind(this);
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleDoneTodo = this.handleDoneTodo.bind(this);
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
  componentDidMount() {
    this.getTodoDatum();
  }
  compare(key) {
    return (a, b) => (a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0);
  }
  saveData(name, todoDatum) {
    window.localStorage.setItem(name, JSON.stringify(todoDatum));
  }
  handleInputTextChange(newTodoText) {
    this.setState({
      newTodoText: newTodoText,
    });
  }
  handleAddNewTodoText() {
    if (!this.state.newTodoText) return;
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const newTodoData = {
      todoDate: `${year}.${month}`,
      text: this.state.newTodoText,
      id: Date.now(),
    };

    const newTodoDatum = this.state.todoDatum;
    const arrayedTodoDatum = [...newTodoDatum, newTodoData].sort(
      this.compare("id")
    );

    this.setState({
      todoDatum: arrayedTodoDatum,
      newTodoText: "",
    });
    this.saveData("todos", arrayedTodoDatum);
  }
  handleDeleteTodo(key, datumType) {
    if (datumType === "todoDatum") {
      let copyDatum = [...this.state.todoDatum];
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
      let copyDatum = [...this.state.doneDatum];
      const index = copyDatum.findIndex(
        (todoData) => todoData.id === Number(key)
      );

      copyDatum.splice(index, 1);

      this.setState({
        doneDatum: copyDatum,
      });

      this.saveData("doneTodos", copyDatum);
    }
  }
  handleDoneTodo(key) {
    let doneTodo = this.handleDeleteTodo(key, "todoDatum");
    doneTodo[0].doneDate = Date.now();
    let newDoneTodo = [...this.state.doneDatum, ...doneTodo].sort(
      this.compare("doneDate")
    );

    this.saveData("doneTodos", newDoneTodo);
    this.setState({
      doneDatum: newDoneTodo,
    });
  }
  render() {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      <div className="container">
        <GlobalStyles />
        <div className="left">
          <InputBar
            newTodoText={this.state.newTodoText}
            onInputTextChange={this.handleInputTextChange}
            onAddNewTodoText={this.handleAddNewTodoText}
          />
          <TodoList
            newTodoText={this.state.newTodoText}
            onAddNewTodoText={this.handleAddNewTodoText}
            todoDatum={this.state.todoDatum}
            onDeleteTodo={this.handleDeleteTodo}
            onDoneTodo={this.handleDoneTodo}
          />
        </div>
        <div className="right">
          <CompletedList
            doneDatum={this.state.doneDatum}
            onDeleteTodo={this.handleDeleteTodo}
          />
        </div>
      </div>
    );
  }
}
export default Container;
