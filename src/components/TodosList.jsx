import React from "react";
import Todo from "./Todo";

const TodosList = ({ todosList, handleButtonTick, handleButtonCross }) => {
  return (
    <div className="container">
      {todosList.map((todo) => (
        <Todo
          className="todo"
          key={todo.id}
          todo={todo}
          handleButtonTick={handleButtonTick}
          handleButtonCross={handleButtonCross}
        />
      ))}
    </div>
  );
};

export default TodosList;
