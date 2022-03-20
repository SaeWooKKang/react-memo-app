import React, { memo } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";
import { makeDate } from "./fs";

import { useSelector } from 'react-redux';
import { go, each, map, take, tap, join, flat } from 'fxjs';

const CompletedList = ({ onDeleteTodo }) => {
  
  const doneDatum = useSelector(({ memo }) => memo.doneDatum );

  const handleDeleteTodo = ({ target }) => target.matches("#delete") && 
    onDeleteTodo(target.parentNode.parentNode.id, doneDatum, "doneDatum");
  
  // [2022, 3, 19]
  const dateArr = date => go(
    makeDate(date), // {}
    Object.entries, // [ [], [], [] ]
    map( ([_, v]) => v), // [2022, 3, 19]
  );

  let lastCategory = "";
  
  // [ {}, {}]
  const tmpl = go(
    doneDatum,
    map(( {startDate, doneDate, text} ) => {

      let doneYearMonth
      let doneYearMonthDate
      const startYearMonthDate = join('.', dateArr(startDate));

      go(
        dateArr(doneDate),
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

      return [doneYearMonth !== lastCategory && <TodoDateRow date={ doneDate } key={ doneDate } />,
          (lastCategory = doneYearMonth,
            <div key={ startDate } onClick={ handleDeleteTodo } id={ startDate }>
              <div className="period">
                { startYearMonthDate }~{ doneYearMonthDate }
              </div>
              <div className="todoData">
                <Todo todoText={ text } />
                <ion-icon id="delete" name="close-circle-outline" className="delete" ></ion-icon>
              </div>
            </div>
          )
      ]
    }), // [ [ {}, {} ]]
    flat // [{}, {}]
  );
  
  return (
    <div>
      <div className="title">Completed</div>
      <div className="doneList">{ tmpl }</div>
    </div>
  );
};

export default memo(CompletedList);
