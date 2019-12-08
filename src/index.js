import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { observer } from "mobx-react";

import Store from './store';
import Time from './components/Time';
import FlagCounter from './components/FlagCounter';
import SapperGame from './components/SapperGame';
import NewGameButton from './components/NewGameButton';
import addNewBomb from './components/startNewGame';

const App = observer(({ store }) => {
  const [ , forceUpdate] = useReducer(x => x + 1, 0);

  function update() {
    forceUpdate();
  }

  if (!store.isBomb) {
    addNewBomb(store.isBombAdd, store.bombCount, store.sapperItems, store.itemsCount);
  }

  let timeCounter;
  function startTimeCounter() {
    timeCounter = setInterval(() => {
      store.timeIncrease();
    }, 1000);
  }
  function stopTimeCounter() {
    clearInterval(timeCounter);

  }

  function startNewGame() {
    store.resetSapperItems();
    store.isBombAdd();
    addNewBomb(store.isBombAdd, store.bombCount, store.sapperItems, store.itemsCount);
    update();
  }

  function gameOver() {
    alert('You lose! Let\'s start new game');
    startNewGame();
  }

  function gameWin() {
    alert('You Win! Let\'s start new game');
    startNewGame();
  }

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
        <Time
          time={store.time} />
        <FlagCounter 
          flagsCount={store.flagsCount} />
      </Container>
      <Container>
        <SapperGame 
          items={store.sapperItems}
          itemsCount={store.itemsCount}
          openItem={store.openItem}
          increaseFlags={store.increaseFlags}
          decreaseFlags={store.decreaseFlags}
          update={update}
          gameWin={gameWin}
          gameOver={gameOver}
          flagsCount={store.flagsCount}
          bombCount={store.bombCount}
          startTimeCounter={startTimeCounter}
          stopTimeCounter={stopTimeCounter} />
      </Container>
      <Container>
        <NewGameButton 
          startNewGame={startNewGame} />
      </Container>
    </App>
  );
});

const store = new Store();
ReactDOM.render(<App store={store} />, document.getElementById('root'));

