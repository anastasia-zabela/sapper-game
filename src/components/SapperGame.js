import React, { useEffect } from 'react';
import styled from 'styled-components';

const SapperGame = ({ items, itemsCount }) => {
  const canvas = React.createRef();
  let ctx;
  let itemsSize;

  function getContext() {
    ctx = canvas.current.getContext('2d');
    itemsSize = canvas.current.width / itemsCount;
  };

  function paintBlocks() {
    ctx.fillStyle = '#f08f6c';
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.width);

    ctx.fillStyle = '#de7f5d';

    items.forEach((elem, i) => {
      const row = Math.floor(i / itemsCount);
      const col = i - (Math.floor(i / itemsCount) * itemsCount);
      const x = row * itemsSize;
      const y = col * itemsSize;

      if (elem.open) {
        ctx.fillStyle = '#e0e0df';
        ctx.fillRect(x, y, itemsSize, itemsSize);

        if (elem.bomb) {
          ctx.fillStyle = '#48233d';
          ctx.fillRect(x, y, itemsSize, itemsSize);
        }
      } else {
        const xEven = (col % 2) === 0;
        const yEven = (row % 2) === 0;
        if ((xEven && !yEven) || (!xEven && yEven)) {
          ctx.fillRect(x, y, itemsSize, itemsSize);
        }
      }

      
    });
  };

  function getCurrentBlock(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    let row = Math.floor(x / itemsSize);
    let col = Math.floor(y / itemsSize);

    return [row * itemsSize, col * itemsSize];
  }

  function addHover(e) {
    let [x, y] = getCurrentBlock(e);
    paintBlocks();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fillRect(x, y, itemsSize, itemsSize);
  }

  function removeHover() {
    paintBlocks();
  }
  
  useEffect(() => {
    console.log(canvas);
    canvas.current.width = canvas.current.clientHeight;
    canvas.current.height = canvas.current.clientHeight;
    
    getContext();
    paintBlocks();
    canvas.current.addEventListener('mousemove', addHover);
    canvas.current.addEventListener('mouseleave', removeHover);
  });

  const Canvas = styled.canvas`
    width: 50vh;
    height: 50vh;
    background: #f08f6c;
  `

  return (
    <Canvas 
      ref={canvas} />
  )
};

export default SapperGame;