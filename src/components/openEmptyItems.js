function openEmptyItems(row, col, items, itemsCount) {
  function openItemsValue(i, row, col) {
    let index = i;

    function openValue() {
      if (items[index].value !== 0) {
        items[index].open = true;
      }
      if (col !== 0 && items[index - 1].value !== 0) {
        items[index - 1].open = true;

      }
      if (col !== 15 && items[index + 1].value !== 0) {
        items[index + 1].open = true;
      }
    }

    openValue();
    
    if (row - 1 >= 0) {
      index = itemsCount * (row - 1) + col;
      openValue();
    }
    
    if (row + 1 < itemsCount) {
      index = itemsCount * (row + 1) + col;
      openValue();
    }
  }

  function openItems() {
    let x = col;
    let y = row;
    const itemsStack = [[x, y]];
    while (itemsStack.length) {
      const newPose = itemsStack.pop();
      [x, y] = newPose;

      let isEmpty = items[itemsCount * y + x].value === 0;
      
      while (y >= 0 && isEmpty) {
        y -= 1;
        if (y >= 0) {
          isEmpty = items[itemsCount * y + x].value === 0;
        } else {
          isEmpty = false;
        }
      }
      y += 1;
      
      let i = itemsCount * y + x;
      isEmpty = items[i].value === 0;
      let reachLeft = false;
      let reachRight = false;
      while (y < itemsCount && isEmpty) {
        openItemsValue(i, y, x);
        items[i].open = true;
        if (x > 0) {
          i = itemsCount * y + (x - 1);
          if (items[i].value === 0 && !items[i].open) {
            if (!reachLeft) {
              itemsStack.push([x - 1, y]);
              reachLeft = true;
            }
          } else if (reachLeft) {
            reachLeft = false;
          }
        }

        if (x < itemsCount - 1) {
          i = itemsCount * y + (x + 1);
          if (items[i].value === 0 && !items[i].open) {
            if (!reachRight) {
              itemsStack.push([x + 1, y]);
              reachRight = true;
            }
          } else if (reachRight) {
            reachRight = false;
          }
        }
        
        y += 1;
        if (y < itemsCount) {
          i = itemsCount * y + x;
          isEmpty = items[i].value === 0;
        } else {
          isEmpty = false;
        }
      }
    }
  }

  openItems();
}

export default openEmptyItems;