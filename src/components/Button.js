import React, { useState } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const Button = ({ id, items, itemsCount, openItem, update, increaseFlag, decreaseFlag }) => {
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

  function openItemsValue(i, row, col) {
    let index = i;

    function openValue() {
      if (items[index].value !== 0) {
        items[index].open = true;
      }
      if (col !== 0 && items[index - 1].value !== 0) {
        items[index - 1].open = true;

      }
      if (col !== 15 && items[index + 1].value !== 0) {
        items[index + 1].open = true;
      }
    }

    openValue();
    
    if (row - 1 >= 0) {
      index = itemsCount * (row - 1) + col;
      openValue();
    }
    
    if (row + 1 < itemsCount) {
      index = itemsCount * (row + 1) + col;
      openValue();
    }
  }

  function openEmptyItems() {
    let x = col;
    let y = row;
    const itemsStack = [[x, y]];
    while (itemsStack.length) {
      const newPose = itemsStack.pop();
      [x, y] = newPose;

      let isEmpty = items[itemsCount * y + x].value === 0;
      
      while (y >= 0 && isEmpty) {
        y -= 1;
        if (y >= 0) {
          isEmpty = items[itemsCount * y + x].value === 0;
        } else {
          isEmpty = false;
        }
      }
      y += 1;
      
      let i = itemsCount * y + x;
      isEmpty = items[i].value === 0;
      let reachLeft = false;
      let reachRight = false;
      while (y < itemsCount && isEmpty) {
        openItemsValue(i, y, x);
        items[i].open = true;
        if (x > 0) {
          i = itemsCount * y + (x - 1);
          if (items[i].value === 0 && !items[i].open) {
            if (!reachLeft) {
              itemsStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < itemsCount - 1) {
          i = itemsCount * y + (x + 1);
          if (items[i].value === 0 && !items[i].open) {
            if (!reachRight) {
              itemsStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }
        
        y += 1;
        if (y < itemsCount) {
          i = itemsCount * y + x;
          isEmpty = items[i].value === 0;
        } else {
          isEmpty = false;
        }
      }
    }
  }

  function openItems() {
    if (items[id].value === 0 && !items[id].bomb) {
      openEmptyItems();
      update();
    }
    if (items[id].flag) {
      items[id].flag = false;
      increaseFlag();
    }

    openItem(id);
    setOpen(true);
    
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