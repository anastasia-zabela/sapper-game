import React, { useState } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

import openEmptyItems from './openEmptyItems';

const Button = ({ id, items, itemsCount, openItem, update, increaseFlag, decreaseFlag, gameWin, gameOver, flagsCount, startTimeCounter, stopTimeCounter, timeCount, setTimeCount }) => {
  const [open, setOpen] = useState(items[id].open);

  const row = Math.floor(id / itemsCount);
  const col = id - (Math.floor(id / itemsCount) * itemsCount);

  const xEven = (col % 2) === 0;
  const yEven = (row % 2) === 0;
  const colorButton = ((xEven && !yEven) || (!xEven && yEven)) ? '#f08f6c' : '#de7f5d';

  const style = {
    background: open ? '#e0e0df' : colorButton,
  }

  let value;
  if (items[id].bomb && items[id].open) {
    value = (
      <FontAwesomeIcon icon={faBomb} />
    )
  } else if (items[id].flag && !items[id].open) {
    value = (
      <FontAwesomeIcon icon={faFlag} />
    )
  } else if (!items[id].bomb && open && items[id].value !== 0) {
    value = items[id].value;
  }

  function openItems() {
    if (items[id].value === 0 && !items[id].bomb) {
      openEmptyItems(row, col, items, itemsCount);
      update();
    }
    if (items[id].flag) {
      items[id].flag = false;
      increaseFlag();
    }
    
    openItem(id);
    setOpen(true);
    
    if (items[id].bomb) {
      gameOver();
    }
    
  }

  function setFlag(e) {
    e.preventDefault();

    if (!items[id].flag) {
      items[id].flag = true;
      decreaseFlag();
    } else {
      items[id].flag = false;
      increaseFlag();
    }
    if (flagsCount === 1) {
      gameWin();
      stopTimeCounter();
    }
  }

  const Button = styled.button`
    font-family: 'Bebas Neue', cursive;
    font-size: 1.5vh;
    color: #48233d;
    border: none;
    outline: none;

    &:hover {
      box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.4);
    }
  `;

  return (
    <Button
      key={id} 
      id={id}
      onClick={openItems}
      onContextMenu={setFlag}
      style={style}>
        { value }
      </Button>
  )
}

export default Button;