import React from "react";
import TodosList from "./components/TodosList";
import Textfield from "@atlaskit/textfield";
// import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";
import "bootstrap/dist/css/bootstrap.css";

const TODOS_LIST_STORAGE_KEY = "TODOS_LIST";

function App() {
  const [todosList, setTodosList] = useState(
    JSON.parse(localStorage.getItem(TODOS_LIST_STORAGE_KEY)) ?? []
  );
  const [textInput, setTextInput] = useState("");

  // useEffect(() => {
  //   const storageTodoList = localStorage.getItem(TODOS_LIST_STORAGE_KEY);
  //   if (storageTodoList) {
  //     setTodosList(JSON.parse(storageTodoList));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem(TODOS_LIST_STORAGE_KEY, JSON.stringify(todosList));
  }, [todosList]);

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value);
  }, []);

  const handleButtonAdd = useCallback(
    (e) => {
      setTodosList([
        { id: v4(), name: textInput, isCompleted: false },
        ...todosList,
      ]);

      setTextInput("");
    },
    [textInput, todosList]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && textInput) {
        setTodosList([
          { id: v4(), name: textInput, isCompleted: false },
          ...todosList,
        ]);

        setTextInput("");
      }
    },
    [textInput, todosList]
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
    setTodosList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo["isCompleted"] } : todo
      )
    );
  }, []);

  const handleButtonCross = useCallback((id) => {
    setTodosList((prevState) => prevState.filter((todo) => todo.id !== id));
  }, []);

  return (
    <div className="wrapper">
      <p className="title">To-Do List</p>
      <Textfield
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
      <TodosList
        todosList={todosList}
        handleButtonTick={handleButtonTick}
        handleButtonCross={handleButtonCross}
      />
    </div>
  );
}

export default App;
