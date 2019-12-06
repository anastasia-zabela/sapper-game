import { observable, decorate, computed, action } from 'mobx';

class Store {
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
  increaseFlags: action.bound,
  decreaseFlags: action.bound,
  openItem: action.bound
});

export default Store;