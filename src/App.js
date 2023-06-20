import React from "react";
import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
// import Button from "@atlaskit/button";
import { useCallback, useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import "bootstrap/dist/css/bootstrap.css";

const TODO_LIST_STORAGE_KEY = "TODO_LIST";

function App() {
  const [todoList, settodoList] = useState(
    JSON.parse(localStorage.getItem(TODO_LIST_STORAGE_KEY)) ?? []
  );
  const [textInput, setTextInput] = useState("");

  // const todoElements = useRef();
  // console.log(todoElements.current);

  // useEffect(() => {
  //   const storageTodoList = localStorage.getItem(TODOS_LIST_STORAGE_KEY);
  //   if (storageTodoList) {
  //     settodoList(JSON.parse(storageTodoList));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem(TODO_LIST_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  // console.log("re-render component");

  const onTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleButtonAdd = (e) => {
    settodoList([
      { id: v4(), name: textInput, isCompleted: false },
      ...todoList,
    ]);

    setTextInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && textInput) {
      settodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);

      setTextInput("");
    }
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     alert("asdad");
  //   }
  // };

  useEffect(() => {
    const todoElements = document.querySelectorAll(".todo");
    for (const data of todoElements) {
      data.getAttribute("iscompleted") === "true"
        ? data.classList.add("line-through")
        : data.classList.remove("line-through");

      //2nd way
      // const childrens = Array.from(todoElements.current.children);

      // childrens.forEach((children) => {
      //   children.getAttribute("iscompleted") === "true"
      //     ? children.classList.add("line-through")
      //     : children.classList.remove("line-through");
      // });
    }
  }, [todoList]);

  const handleButtonTick = useCallback((id) => {
    settodoList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo["isCompleted"] } : todo
      )
    );
  }, []);

  const handleButtonCross = useCallback((id) => {
    settodoList((prevState) => prevState.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div className="wrapper">
      <label htmlFor="add-todo" className="title">
        To-Do List
      </label>
      <Textfield
        id="add-todo"
        className="add-todo"
        name="add-todo"
        placeholder="Thêm việc cần làm ..."
        onKeyDown={handleKeyDown}
        elemAfterInput={
          <button
            className="btn btn-dark"
            hidden={!textInput}
            style={{ margin: "2px 4px 2px" }}
            onClick={handleButtonAdd}
          >
            Thêm
          </button>
        }
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodoList
        todoList={todoList}
        handleButtonTick={handleButtonTick}
        handleButtonCross={handleButtonCross}
        // todoElements={todoElements}
      />
    </div>
  );
}

export default App;
