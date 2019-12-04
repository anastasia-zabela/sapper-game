import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';

import Time from './components/Time';
import FlagCounter from './components/FlagCounter';
import SapperGame from './components/SapperGame';
import NewGameButton from './components/NewGameButton';

function App() {
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
        <FlagCounter />
      </Container>
      <Container>
        <SapperGame />
      </Container>
      <Container>
        <NewGameButton />
      </Container>
    </App>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));

