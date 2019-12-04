import React from 'react';
import styled from 'styled-components';

const NewGameButton = () => {
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
  `

  return (
    <Button>
      New game
    </Button>
  )
};

export default NewGameButton;