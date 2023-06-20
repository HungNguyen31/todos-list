import React from "react";
import Todo from "./Todo";

const todoList = ({
  todoList,
  handleButtonTick,
  handleButtonCross,
  todoElements,
}) => {
  return (
    <div ref={todoElements} className="container">
      {todoList.map((todo) => (
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

export default todoList;
