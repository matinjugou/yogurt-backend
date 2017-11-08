module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    console.log(this.websocket);
    this.emit('opend', 'This client opend successfully!');
    this.broadcast('joined', 'There is a new client joined');
  }

  authAction() {
    let data = this.wsData;

  }

  textMsgAction() {
    let data = this.wsData;

  }
};
