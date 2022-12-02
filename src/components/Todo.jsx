import React from "react";
import Button from "@atlaskit/button";
import CheckIcon from "@atlaskit/icon/glyph/check";
import styled, { css } from "styled-components";

const ButtonStyled = styled(Button)`
  &,
  &:hover {
    ${(p) =>
      p.iscompleted === "true" &&
      css`
        text-decoration: line-through;
      `}
  }
`;

const Todo = ({ todo, handleButtonTick }) => {
  return (
    <div className="todo" iscompleted={todo.isCompleted.toString()}>
      <ButtonStyled
        className="btn-todo"
        iscompleted={todo.isCompleted.toString()}
        shouldFitContainer
        iconAfter={
          !todo.isCompleted && (
            <span
              className="check-icon"
              onClick={() => handleButtonTick(todo.id)}
            >
              <CheckIcon primaryColor="Green" />
            </span>
          )
        }
      >
        {todo.name}
      </ButtonStyled>
    </div>
  );
};

export default Todo;
