import React from "react";
import Todo from "./Todo";

const TodosList = ({ todosList, handleButtonTick }) => {
  return (
    <div className="container">
      {todosList.map((todo) => (
        <Todo key={todo.id} todo={todo} handleButtonTick={handleButtonTick} />
      ))}
    </div>
  );
};

export default TodosList;
