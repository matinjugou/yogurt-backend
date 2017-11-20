const jwt = require("jsonwebtoken");
module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  openAction() {
    console.log(this.websocket);
    this.emit('opend', 'This client opend successfully!');
    this.broadcast('joined', 'There is a new client joined');
  }

  /**
  * User Controller
  **/
  userregAction() {
    let data = this.wsData;
    let socket = this.ctx.req.io;
    let userId = data.userId;
    socket.token = data.token;
    socket.join('userRoom ' + userId);
  }

  userTextMsgAction() {
    let data = this.wsData;
    let socket = this.ctx.req.io;
    let staffId = data.staffId;
    let userId = data.userId;
    socket.to('staffRoom ' + staffId).emit('userTextMsg',
      {
        from: userId,
        msg: data.msg
      });
  }

  /**
   * Staff Controller
   **/
  staffRegAction() {
    let data = this.wsData;
    let socket = this.ctx.req.io;
    let staffId = data.staffId;
    socket.token = data.token;
    socket.join('staffRoom ' + staffId);
  }

  staffTextMsgAction() {
    let data = this.wsData;
    let socket = this.ctx.req.io;
    let staffId = data.staffId;
    let userId = data.userId;
    socket.to('userRoom ' + userId).emit('staffTextMsg',
      {
        from: staffId,
        msg: data.msg
      });
  }

  async transUserAction() {
    let data = this.wsData;
    let socket = this.ctx.req.io;
    let userId = data.userId;
    let staffAId = data.staffAId;
    let staffBId = data.staffBId;
    let messages = data.messages;
    await this.cache('transInfo:' + userId, messages, {
      type: 'redis',
      redis: {
        timeout: 10 * 60 * 1000
      }
    });
    socket.to('staffRoom ' + staffBId).emit('transMsg',
      {
        from: staffAId,
        userId: userId
      });
  }
};
