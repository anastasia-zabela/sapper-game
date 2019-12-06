import React, { useState } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons'

const Button = ({ id, items, itemsCount, openItem }) => {
  const [open, setOpen] = useState(false);

  const row = Math.floor(id / itemsCount);
  const col = id - (Math.floor(id / itemsCount) * itemsCount);
  const xEven = (col % 2) === 0;
  const yEven = (row % 2) === 0;
  const colorButton = ((xEven && !yEven) || (!xEven && yEven)) ? '#f08f6c' : '#de7f5d';

  const style = {
    background: open ? '#e0e0df' : colorButton,
  }

  let value;
  if (items[id].bomb) {
    value = (
      <FontAwesomeIcon icon={faBomb} />
    )
  } else if (!items[id].bomb && open && items[id].value !== 0) {
    value = items[id].value;
  }

  function openItems(e) {
    openItem(e.target.id);
    setOpen(true);
  }

  const Button = styled.button`
    font-family: 'Bebas Neue', cursive;
    font-size: 2vh;
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
      style={style}>
        { value }
      </Button>
  )
}

export default Button;