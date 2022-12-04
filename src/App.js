import React from "react";
import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
// import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";
import "bootstrap/dist/css/bootstrap.css";

const TODO_LIST_STORAGE_KEY = "TODO_LIST";

function App() {
  const [todoList, settodoList] = useState(
    JSON.parse(localStorage.getItem(TODO_LIST_STORAGE_KEY)) ?? []
  );
  const [textInput, setTextInput] = useState("");

  // useEffect(() => {
  //   const storageTodoList = localStorage.getItem(TODOS_LIST_STORAGE_KEY);
  //   if (storageTodoList) {
  //     settodoList(JSON.parse(storageTodoList));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem(TODO_LIST_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const handleButtonAdd = useCallback(
    (e) => {
      settodoList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todoList,
      ]);

      setTextInput("");
    },
    [textInput, todoList]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && textInput) {
        settodoList([
          { id: v4(), name: textInput, isCompleted: false },
          ...todoList,
        ]);

        setTextInput("");
      }
    },
    [textInput, todoList]
  );

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     alert("asdad");
  //   }
  // };

  useEffect(() => {
    const todoElement = document.querySelectorAll(".todo");
    for (const data of todoElement) {
      if (data.getAttribute("iscompleted") === "true") {
        data.classList.add("line-through");
      }
      if (data.getAttribute("iscompleted") === "false") {
        data.classList.remove("line-through");
      }
    }
  });

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
      />
    </div>
  );
}

export default App;
