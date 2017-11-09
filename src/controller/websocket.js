module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    console.log(this.websocket);
    this.emit('opend', 'This client opend successfully!');
    this.broadcast('joined', 'There is a new client joined');
  }

  regAction() {
    let data = this.wsData;
    let socket = this.ctx.req.io;
    socket.token = data.token;
    
  }

  textMsgAction() {
    let data = this.wsData;

  }
};
