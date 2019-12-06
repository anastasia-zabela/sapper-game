import React from 'react';
import styled from 'styled-components';

import Button from './Button';

const SapperGame = ({ items, itemsCount, openItem }) => {
  const buttons = new Array(itemsCount ** 2).fill().map((elem, i) => {
    return (<Button
      key={i}
      id={i}
      items={items}
      itemsCount={itemsCount}
      openItem={openItem} />);
  });

  const Buttons = styled.div`
    display: grid;
    grid-template: repeat(${props => props.count}, 1fr) / repeat(${props => props.count}, 1fr);
    width: 50vh;
    height: 50vh;
  ` 

  return (
    <Buttons count={itemsCount}>{ buttons }</Buttons>
  )
};

export default SapperGame;