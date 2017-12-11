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

  async closeAction() {
    //console.log(this);
    //if (this.websocket.type === 'staff') {
    //  await this.model('staff').offlineStaff(this.websocket.staffId);
    //}
  }

  /**
  * User Controller
  **/
  userRegAction() {
    let data = this.wsData;
    console.log("userRegData=", data);
    let userId = data.userId;
    this.websocket.token = data.token;
    this.websocket.type = 'user';
    this.websocket.userId = data.userId;
    this.websocket.join('userRoom ' + userId);
    this.emit('regResult', {code: 0, msg:'reg success'});
  }

  async userMsgAction() {
    let data = this.wsData;
    console.log("data=",data);
    let staffId = data.staffId;
    let userId = data.userId;
    let token = data.token;
    let type = data.type;
    let url = data.url;
    let compressedUrl = data.compressedUrl;
    let name = data.name;
    let size = data.size;
    let mimeType = data.mimeType;
    let msg = data.msg;
    const myDate = new Date();
    this.websocket.to('staffRoom ' + staffId).emit('userMsg',
      {
        staffId: staffId,
        userId: userId,
        type: type,
        url: url,
        compressedUrl: compressedUrl,
        name: name,
        size: size,
        mimeTypes: mimeType,
        msg: msg,
        time: myDate.toLocaleDateString()
      });
    const content = {
      staffId: staffId,
      userId: userId,
      token: token,
      type: type,
      url: url,
      compressedUrl: compressedUrl,
      name: name,
      size: size,
      mimeTypes: mimeType,
      msg: msg,
      time: myDate.toLocaleDateString()
    };
    await this.mongo('sessionPair', 'mongo').insertMessage(staffId, userId, 'u_s', content);
    this.emit('sendResult',
      {
        code: 0,
        msg: 'Message send successfully.'
      });
  }

  updateQueueAction() {
    let data = this.wsData;
    let staffId = data.staffId;
    console.log(staffId);
    this.websocket.to('staffRoom ' + staffId).emit('updateQueue', {
      msg: 'Please update your queue'
    });
  }

  userServiceStopAction() {
    let staffId = this.get('staffId');
    let userId = this.get('userId');
    let msg = this.get('msg');
    this.websocket.to('staffRoom ' + staffId).emit('userServiceStop',
      {
        from: userId,
        msg: msg
      });
  }

  /**
   * Staff Controller
   **/
  async staffRegAction() {
    let data = this.wsData;
    let staffId = data.staffId;
    this.websocket.token = data.token;
    this.websocket.type = 'staff';
    this.websocket.staffId = data.staffId;
    this.websocket.join('staffRoom ' + staffId);
    this.emit('regResult', {code: 0, msg:'reg success'});
    await this.model('staff').onlineStaff(staffId);
  }

  async staffMsgAction() {
    let data = this.wsData;
    console.log("data=",data);
    let staffId = data.staffId;
    let userId = data.userId;
    let token = data.token;
    let type = data.type;
    let url = data.url;
    let compressedUrl = data.compressedUrl;
    let name = data.name;
    let size = data.size;
    let mimeType = data.mimeType;
    let msg = data.msg;
    const myDate = new Date();
    this.websocket.to('userRoom ' + userId).emit('staffMsg',
      {
        staffId: staffId,
        userId: userId,
        type: type,
        url: url,
        compressedUrl: compressedUrl,
        name: name,
        size: size,
        mimeTypes: mimeType,
        msg: msg,
        time: myDate.toLocaleDateString()
      });
    const content = {
      staffId: staffId,
      userId: userId,
      token: token,
      type: type,
      url: url,
      compressedUrl: compressedUrl,
      name: name,
      size: size,
      mimeTypes: mimeType,
      msg: msg,
      time: myDate.toLocaleDateString()
    };
    await this.mongo('sessionPair', 'mongo').insertMessage(staffId, userId, 's_u', content);
    this.emit('sendResult',
      {
        code: 0,
        msg: 'Message send successfully.'
      });
  }

  serviceStartAction() {
    let staffId = this.get('staffId');
    let userId = this.get('userId');
    let msg = this.get('msg');
    this.websocket.to('userRoom ' + userId).emit('serviceStart', {
      from: staffId,
      msg: msg
    });
  }

  staffServiceStopAction() {
    let staffId = this.get('staffId');
    let userId = this.get('userId');
    let msg = this.get('msg');
    this.websocket.to('userRoom ' + userId).emit('staffServiceStop', {
      from: staffId,
      msg: msg
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
