const jwt = require("jsonwebtoken");
module.exports = class extends think.Controller {
  constructor(...arg) {
    super(...arg);
  }

  indexAction() {
    return this.display('websocket_index');
  }

  openAction() {
    //console.log(this.websocket);
    this.emit('opend', 'This client opend successfully!');
    this.broadcast('joined', 'There is a new client joined');
  }

  closeAction() {
    //console.log(this);
  }

  /**
  * User Controller
  **/
  userRegAction() {
    let data = this.wsData;
    let userId = data.userId;
    this.websocket.token = data.token;
    this.websocket.join('userRoom ' + userId);
    this.emit('regResult', {code:1, msg:'reg success'});
  }

  userTextMsgAction() {
    let data = this.wsData;
    let staffId = data.staffId;
    let userId = data.userId;
    this.websocket.to('staffRoom ' + staffId).emit('userTextMsg',
      {
        from: userId,
        msg: data.msg
      });
    this.emit('sendResult',
      {
        code: 1,
        msg: 'Message send successfully.'
      });
  }

  /**
   * Staff Controller
   **/
  staffRegAction() {
    let data = this.wsData;
    let staffId = data.staffId;
    this.websocket.token = data.token;
    this.websocket.join('staffRoom ' + staffId);
    this.emit('regResult', {code:1, msg:'reg success'});
  }

  staffTextMsgAction() {
    let data = this.wsData;
    let staffId = data.staffId;
    let userId = data.userId;
    console.log('Msg one sent');
    this.websocket.to('userRoom ' + userId).emit('staffTextMsg',
      {
        from: staffId,
        msg: data.msg
      });
    this.emit('sendResult',
      {
        code: 1,
        msg: 'Message send successfully.'
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
