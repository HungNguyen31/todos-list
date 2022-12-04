import React from "react";
import Button from "@atlaskit/button";
import CheckIcon from "@atlaskit/icon/glyph/check";
import CrossIcon from "@atlaskit/icon/glyph/cross";
// import CheckIcon from "@atlaskit/icon/glyph/audio";
// import styled, { css } from "styled-components";

// const ButtonStyled = styled(Button)`
//   &,
//   &:hover {
//     ${(p) =>
//       p.iscompleted === "true" &&
//       css`
//         text-decoration: line-through;
//       `}
//   }
// `;

const Todo = ({ todo, handleButtonTick, handleButtonCross }) => {
  return (
    <div className="todo" iscompleted={todo.isCompleted.toString()}>
      <Button
        className="btn-todo"
        title={todo.name}
        iscompleted={todo.isCompleted.toString()}
        shouldFitContainer
        iconAfter={
          // !todo.isCompleted && (
          <span className="icon-area">
            <span
              className="check-icon"
              onClick={() => handleButtonTick(todo.id)}
            >
              <CheckIcon primaryColor="Green" />
            </span>
            <span
              className="cross-icon"
              onClick={() => handleButtonCross(todo.id)}
            >
              <CrossIcon primaryColor="Red" />
            </span>
          </span>
        }
      >
        {todo.name}
      </Button>
    </div>
  );
};

export default Todo;
