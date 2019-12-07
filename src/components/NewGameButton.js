import React from 'react';
import styled from 'styled-components';

const NewGameButton = ({ items, itemsCount, bombCount, isBomb, isBombAdd }) => {
  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function addBomb() {
    isBombAdd();

    function getNumBomb() {
      let numBomb = getRandomNum(0, items.length);
      if (!items[numBomb].bomb) {
        items[numBomb].bomb = true;
      } else {
        getNumBomb();
      }
    }

    for (let i = 0; i < bombCount; i++) {
      getNumBomb();
    }
  };

  function addValue() {
    console.log('addValue')
    function changeValue(index, col) {
      // console.log(index);
      if (!items[index].bomb) {
        items[index].value += 1;
      }
      if (col !== 0) {
        items[index - 1].value += 1;
      }
      if (col !== 15) {
        items[index + 1].value += 1;
      }
    }

    items.forEach((elem, i) => {
      if (elem.bomb) {
        let index = i;
        let rowBomb = Math.floor(index / itemsCount);
        let colBomb = index - (Math.floor(index / itemsCount) * itemsCount);

        changeValue(index, colBomb);

        if (rowBomb - 1 >= 0) {
          index = itemsCount * (rowBomb - 1) + colBomb;
          changeValue(index, colBomb);
        }
        
        if (rowBomb + 1 < itemsCount) {
          index = itemsCount * (rowBomb + 1) + colBomb;
          changeValue(index, colBomb);
        }
      }
    })
  }

  if (!isBomb) {
    addBomb();
    addValue();
  }

  
  // console.log(items);

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