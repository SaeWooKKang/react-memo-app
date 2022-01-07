import { PureComponent } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";

class CompletedList extends PureComponent {
  constructor(props) {
    super(props);
  }
  handleDeleteTodo = ({ target }) => {
    if (!target.matches(".todoData>ion-icon")) return null;
    this.props.onDeleteTodo(target.parentNode.parentNode.id, "doneDatum");
  };
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

export default CompletedList;
