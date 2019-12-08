function startNewGame(isBombAdd, bombCount, items, itemsCount) {
  function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function addBomb() {
    console.log('start')
    isBombAdd();
    function getNumBomb() {
      let numBomb = getRandomNum(0, items.length);
      if (!items[numBomb].bomb) {
        items[numBomb].bomb = true;
      } else {
        getNumBomb();
      }
    }

    for (let i = 0; i < bombCount; i++) {
      getNumBomb();
    }
  };

  function addValue() {
    function changeValue(index, col) {
      if (!items[index].bomb) {
        items[index].value += 1;
      }
      if (col !== 0) {
        items[index - 1].value += 1;
      }
      if (col !== 15) {
        items[index + 1].value += 1;
      }
    }

    items.forEach((elem, i) => {
      if (elem.bomb) {
        let index = i;
        let rowBomb = Math.floor(index / itemsCount);
        let colBomb = index - (Math.floor(index / itemsCount) * itemsCount);

        changeValue(index, colBomb);

        if (rowBomb - 1 >= 0) {
          index = itemsCount * (rowBomb - 1) + colBomb;
          changeValue(index, colBomb);
        }
        
        if (rowBomb + 1 < itemsCount) {
          index = itemsCount * (rowBomb + 1) + colBomb;
          changeValue(index, colBomb);
        }
      }
    })
  }

  addBomb();
  addValue();
}

export default startNewGame;