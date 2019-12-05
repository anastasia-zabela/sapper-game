import { observable, decorate, computed, action } from 'mobx';

class Store {
  flagsCount = 40;
  bombCount = 40;
  itemsCount = 16;

  get itemsSize() {
    return this.itemsCount
  };
  get sapperItems() {
    return new Array(this.itemsCount ** 2).fill().map(() => {
      return {
        value: 0,
        state: 'close',
        flag: false,
        mine: false,
      };
    });
  };

  increaseFlags() {
    this.flagsCount += 1;
  };
  decreaseFlags() {
    this.flagsCount -= 1;
    console.log('d')
  };
  resetSapperItems() {
    this.sapperItems = new Array(this.itemsCount ** 2).fill().map(() => {
      return {
        value: 0,
        state: 'close',
        flag: false,
        mine: false,
      };
    });
  }
};

decorate(Store, {
  itemsCount: observable,
  itemsSize: computed,
  sapperItems: computed,
  flagsCount: observable,
  increaseFlags: action.bound,
  decreaseFlags: action.bound
});

export default Store;