import React from "react";
import TodosList from "./components/TodosList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";

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

  useEffect(() => {
    const todoElement = document.querySelectorAll(".todo");
    for (const data of todoElement) {
      if (data.getAttribute("iscompleted") === "true") {
        data.classList.add("line-through");
      }
    }
  });

  const handleButtonTick = useCallback((id) => {
    setTodosList((prevState) =>
      prevState.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  }, []);

  return (
    <div className="wrapper">
      <p className="title">Todos List</p>
      <Textfield
        name="add-todo"
        placeholder="Thêm việc cần làm ..."
        elemAfterInput={
          <Button
            isDisabled={!textInput}
            appearance="primary"
            style={{ margin: "2px 4px 2px" }}
            onClick={handleButtonAdd}
          >
            Thêm
          </Button>
        }
        value={textInput}
        onChange={onTextInputChange}
      ></Textfield>
      <TodosList todosList={todosList} handleButtonTick={handleButtonTick} />
    </div>
  );
}

export default App;
