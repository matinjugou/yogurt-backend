module.exports = class extends think.Mongo {
  get schema() {
    return {
      userId: Number,
      staffId: Number,
      lastActivate: { type: Date },
      status: Number, // 1 on, 2 waiting, 0 down
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
        messageCount: 0,
        messages: []
      });
    }
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
    return this.where({staffId: staffId, userId: userId}).update({
      '$push': { 'messages': msgitem },
      '$inc': { 'messagesCount': 1 }
    });
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
