import React, { memo } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";
import { makeDate } from "./fs";

const CompletedList = (props) => {
  const { onDeleteTodo, doneDatum } = props;

  const handleDeleteTodo = ({ target }) => {
    if (!target.matches(".todoData>ion-icon")) return null;
    onDeleteTodo(target.parentNode.parentNode.id, doneDatum, "doneDatum");
  };
  const rows = [];
  let lastCategory = "";

  doneDatum.forEach((doneData, idx) => {
    const doneDate = makeDate(doneData.doneDate);
    const { year: doneYear, month: doneMonth, day: doneDay } = doneDate;

    const doneYearMonth = `${doneYear}.${doneMonth}`;
    const doneYearMonthDate = doneYearMonth.concat(".", doneDay);

    const startDate = makeDate(doneData.startDate);
    const { year: startYear, month: startMonth, day: startDay } = startDate;
    const startYearMonthDate = `${ startYear }.${ startMonth }.${ startDay }`;

    if (doneYearMonth !== lastCategory) {
      rows.push(<TodoDateRow date={ doneData.doneDate } key={ idx } />);
    }
    rows.push(
      <div
        key={ doneData.startDate }
        onClick={ handleDeleteTodo }
        id={ doneData.startDate }
      >
        <div className="period">
          { startYearMonthDate }~{ doneYearMonthDate }
        </div>
        <div className="todoData">
          <Todo todoData={ doneData } />
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
      <div className="doneList">{ rows }</div>
    </div>
  );
};

export default memo(CompletedList);
