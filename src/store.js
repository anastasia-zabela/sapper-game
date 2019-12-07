import { observable, decorate, computed, action } from 'mobx';

class Store {
  isBomb = false;

  flagsCount = 40;
  bombCount = 40;
  itemsCount = 16;

  get sapperItems() {
    return new Array(this.itemsCount ** 2).fill().map(() => {
      return {
        value: 0,
        open: false,
        flag: false,
        bomb: false,
      };
    });
  };

  isBombAdd() {
    this.isBomb = !this.isBomb;
  }

  increaseFlags() {
    this.flagsCount += 1;
  };
  decreaseFlags() {
    this.flagsCount -= 1;
  };

  openItem(i) {
    this.sapperItems[i].open = true;
  }
};

decorate(Store, {
  itemsCount: observable,
  sapperItems: computed,
  flagsCount: observable,
  isBombAdd: action.bound,
  increaseFlags: action.bound,
  decreaseFlags: action.bound,
  openItem: action.bound
});

export default Store;