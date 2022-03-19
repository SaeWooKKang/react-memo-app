import React, { memo } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";
import { makeDate } from "./fs";

import { useSelector } from 'react-redux';
import { go, each, map, take, tap, join } from 'fxjs';

const CompletedList = ({ onDeleteTodo }) => {
  
  const doneDatum = useSelector(({ memo }) => memo.doneDatum );

  const handleDeleteTodo = ({ target }) => target.matches("#delete") && 
    onDeleteTodo(target.parentNode.parentNode.id, doneDatum, "doneDatum");

  // 수정 해야할 부분
  const rows = [];
  let lastCategory = "";

  doneDatum.forEach((doneData, idx) => {
    
    let doneYearMonth
    let doneYearMonthDate

    go(
      makeDate(doneData.doneDate), // {}
      Object.entries, // [ [], [], [] ]
      map( ([_, v]) => v), // [2022, 3, 19]
      tap( // YMD
        join('.'), // 2022.3.19
        v => [v],
        each(date => doneYearMonthDate = date)
      ),
      tap( // YM
        take(2), // [2022, 3]
        join('.'), // 2022.3
        v => [v],
        each(date => doneYearMonth = date)
      ),
    );

    const startYearMonthDate = go(
      makeDate(doneData.startDate), // {}
      Object.entries, // [ [], [], [] ]
      map( ([_, v]) => v), // [2022, 3, 19]
      join('.'), // 2022.3.19
    );

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
