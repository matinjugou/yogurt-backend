const jwt = require("jsonwebtoken");
const Format = function (date, fmt) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
};

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

  async userLogOutAction() {
    const self = this;
    let data = this.wsData;
    let userId = data.userId;
    let token = data.token;
    jwt.verify(token, this.config('secretKey'), async function(err, decode) {
      if (err) {
      } else {
        if (decode.userId === userId) {
          let stuff = await self.mongo('sessionPair', 'mongo').getStaff(userId);
          console.log(stuff);
          for (let staff of stuff) {
            self.model('staff').removeUser(staff.staffId);
            self.websocket.to('staffRoom ' + staff.staffId).emit('updateQueue', {
              msg: 'Please update your queue'
            });
          }
          self.mongo('sessionPair', 'mongo').offlineSession(userId);
        }
      }
    });
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
        time: Format(myDate, "yyyy-MM-dd hh:mm:ss")
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
      time: Format(myDate, "yyyy-MM-dd hh:mm:ss")
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
    console.log("staffId=", staffId);
    this.websocket.token = data.token;
    this.websocket.type = 'staff';
    this.websocket.staffId = data.staffId;
    this.websocket.join('staffRoom ' + staffId);
    this.emit('regResult', {code: 0, msg:'reg success'});
    await this.model('staff').onlineStaff(staffId);
  }

  async staffLogOutAction() {
    let data = this.wsData;
    let staffId = data.staffId;
    let token = data.token;
    const self = this;
    jwt.verify(token, this.config('secretKey'), function(err, decode) {
      if (err) {
        console.log('token=', token, 'staffId', staffId);
        console.log('error');
      } else {
        console.log(decode.staffId === staffId);
        if (decode.staffId === staffId) {
          self.model('staff').offlineStaff(staffId);
        }
      }
    });
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
    /*
    if (type === 'text') {
      const privatePairs = this.mongo('quickReplyPrivate', 'mongo').getItem(staffId);
      const companyId = Number(staffId.split()[0]);
      const publicPairs = this.mongo('quickReplyPublic', 'mongo').getItem(companyId);
      // const matches = msg.match(/#\S+\s/g);
      for (const pair of privatePairs) {
        let reg = new RegExp("#" + pair.phrase + " ", "g");
        msg = msg.replace(reg, pair.sentence);
      }
      for (const pair of publicPairs) {
        let reg = new RegExp("#" + pair.phrase + " ", "g");
        msg = msg.replace(reg, pair.sentence);
      }
    }
    */
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
        time: Format(myDate, "yyyy-MM-dd hh:mm:ss")
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
      time: Format(myDate, "yyyy-MM-dd hh:mm:ss")
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
