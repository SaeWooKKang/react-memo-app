import React, { memo } from "react";
import TodoDateRow from "./TodoDateRow";
import Todo from "./Todo";
import { YMD, diffrent, array, push } from "./fs";

import { useSelector } from 'react-redux';
import { go, each, map } from 'fxjs';

const CompletedList = ({ onDeleteTodo }) => {
  
  const doneDatum = useSelector(({ memo }) => memo.doneDatum );

  const handleDeleteTodo = ({ target }) => target.matches("#delete") && 
    onDeleteTodo(target.parentNode.parentNode.id, doneDatum, "doneDatum");
  
  let lastCategory = "";
  
  // [ <div>1</div>, <div>2</div> ]
  const tmpl = go(
    doneDatum,
    map(({ startDate, doneDate, text }) => {

      const doneYearMonth = YMD(doneDate, 2);
      const doneYearMonthDate = YMD(doneDate, 3);
      const startYearMonthDate = YMD(startDate, 3);

      return go(
        array( 
          diffrent(doneYearMonth, lastCategory) 
            && <TodoDateRow date={ doneDate } key={ doneDate } />),
        each(_ => lastCategory = doneYearMonth),
        push(
          <div key={ startDate } onClick={ handleDeleteTodo } id={ startDate }>
              <div className="period">
                { startYearMonthDate }~{ doneYearMonthDate }
              </div>
              <div className="todoData">
                <Todo todoText={ text } />
                <ion-icon id="delete" name="close-circle-outline" className="delete" ></ion-icon>
              </div>
          </div>))}) 
  );
  
  return (
    <div>
      <div className="title">Completed</div>
      <div className="doneList">{ tmpl }</div>
    </div>
  );
};

export default memo(CompletedList);
