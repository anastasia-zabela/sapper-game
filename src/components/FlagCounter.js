import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const FlagCounter = ({ flagsCount }) => {

  const CounterContain = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const Counter = styled.div`
    margin-left: 10px;
  `

  return (
    <CounterContain>
      <FontAwesomeIcon icon={faFlag} />
      <Counter>{ flagsCount }</Counter>
    </CounterContain>
  )
};

export default FlagCounter;