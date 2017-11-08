module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    this.emit('opend', 'This client opend successfully!');
    this.broadcase('joined', 'There is a new client joined');
  }

  textMsg() {

  }
};
