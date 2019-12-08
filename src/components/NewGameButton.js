import React from 'react';
import styled from 'styled-components';

const NewGameButton = ({ startNewGame }) => {
  const Button = styled.button`
    width: 25vh;
    height: 6vh;
    font-family: 'Bebas Neue', cursive;
    font-size: 3vh;
    background: #83c2a5;
    border: none;
    border-radius: 10px;
    color: #f7f7f7;
    outline: none;

    &:hover {
      box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
    }
  `

  return (
    <Button onClick={startNewGame}>
      New game
    </Button>
  )
};

export default NewGameButton;