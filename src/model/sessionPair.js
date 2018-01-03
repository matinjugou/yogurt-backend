module.exports = class extends think.Mongo {
  get schema() {
    return {
      userId: Number,
      staffId: Number,
      lastActivate: { type: Date },
      status: Number, // 1 on, 2 waiting, 0 down
      ask: Number,
      ans: Number,
      messagesCount: Number,
      messages: []
    };
  }

  async initSession(staffId, userId) {
    const pair = await this.where({staffId: staffId, userId: userId}).find();
    // console.log("pair=", pair);
    if (Object.keys(pair).length !== 0) {
      return this.thenUpdate({
        lastActivate: ['exp', 'CURRENT_TIMESTAMP()'],
        status: 1
      }, {staffId: staffId, userId: userId});
    } else {
      return this.where({staffId: staffId, userId: userId}).thenAdd({
        userId: userId,
        staffId: staffId,
        lastActivate: ['exp', 'CURRENT_TIMESTAMP()'],
        status: 1,
        messagesCount: 0,
        ask: 0,
        ans: 0,
        messages: []
      });
    }
  }

  async getRecords(staffId, userId, index) {
    index = Number(index);
    const pair = await this.where({staffId: staffId, userId: userId}).find();
    if (Object.keys(pair).length !== 0) {
      const messages = pair.messages;
      const ans = [];
      if (index === -1) {
        index = messages.length - 1;
      }
      for (let i = 0; i < 7; i++) {
        if (index - i >= 0) {
          ans.push(messages[index - i]);
        } else {
          break;
        }
      }
      return ans;
    } else {
      return [];
    }
  }

  async getStaff(userId) {
    return this.where({userId: userId, status: 1}).field('staffId').select();
  }

  offlineSession(userId) {
    return this.thenUpdate({
      status: 0
    }, {userId: userId, status: 1});
  }

  offlineSessionPair(staffId, userId) {
    return this.thenUpdate({
      status: 0
    }, {staffId: staffId, userId: userId, status: 1});
  }

  async insertMessage(staffId, userId, direction, content) {
    const msgCount = await this.where({staffId: staffId, userId: userId})
      .field('messagesCount').find();
    const msgitem = {};
    msgitem.index = msgCount.messagesCount;
    msgitem.staffId = staffId;
    msgitem.userId = userId;
    msgitem.direction = direction;
    msgitem.content = content;
    if (direction === 's_u') {
      return this.where({staffId: staffId, userId: userId}).update({
        '$push': {'messages': msgitem},
        '$inc': {'messagesCount': 1, 'ans': 1}
      });
    } else {
      return this.where({staffId: staffId, userId: userId}).update({
        '$push': { 'messages': msgitem },
        '$inc': { 'messagesCount': 1, 'ask': 1 }
      });
    }
  }

  async getQueue(staffId) {
    const servingPart = [];
    const waitingPart = [];
    const serving = await this.where({staffId: staffId, status: 1}).select();
    const waiting = await this.where({staffId: staffId, status: 2}).select();
    for (const pair of serving) {
      servingPart.push(pair.userId);
    }
    for (const pair of waiting) {
      waitingPart.push(pair.userId);
    }
    return { serving: servingPart, waiting: waitingPart };
  }
};
