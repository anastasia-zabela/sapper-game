import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

const Time = ({ time }) => {
  const TimeContain = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `

  const Time = styled.div`
    margin-left: 10px;
  `

  return (
    <TimeContain>
      <FontAwesomeIcon icon={faHourglassHalf} />
      <Time>{ time }</Time>
    </TimeContain>
  )
};

export default Time;