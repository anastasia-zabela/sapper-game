import React from 'react';
import styled from 'styled-components';

import Time from './components/Time/Time';
import FlagCounter from './components/FlagCounter/FlagCounter';
import SupperGame from './components/SupperGame/SupperGame';
import NewGameButton from './components/NewGameButton/NewGameButton';

function App() {
  const App = styled.div`
    display: grid;
    grid-template: 1fr 2fr 1fr / 1fr;
  `

  return (
    <App>
      <section>
        <Time />
        <FlagCounter />
      </section>
      <section>
        <SupperGame />
      </section>
      <section>
        <NewGameButton />
      </section>
    </App>
  );
}

export default App;
