import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { observer } from "mobx-react";

import Store from './store';
import Time from './components/Time';
import FlagCounter from './components/FlagCounter';
import SapperGame from './components/SapperGame';
import NewGameButton from './components/NewGameButton';

const App = observer(({ store }) => {
  const App = styled.div`
    display: grid;
    grid-template: 1fr 4fr 1fr / 1fr;
    padding: 3vh;
    background: #f7f7f7;
    border-radius: 20px;
    font-family: 'Bebas Neue', cursive;
  `

  const Container = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3vh;

    ${props =>
      props.indicators &&
      css`
        color: #48233d;
      `};
  `

  return (
    <App>
      <Container indicators >
        <Time />
        <FlagCounter 
          flagsCount={store.flagsCount}
          decreaseFlags={store.decreaseFlags} />
      </Container>
      <Container>
        <SapperGame items={store.sapperItems} />
      </Container>
      <Container>
        <NewGameButton 
          bombCount={store.bombCount}
          items={store.sapperItems}
          itemsCount={store.itemsCount} />
      </Container>
    </App>
  );
});

const store = new Store();
ReactDOM.render(<App store={store} />, document.getElementById('root'));

