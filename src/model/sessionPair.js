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
    if (pair) {
      return this.where({staffId: staffId, userId: userId}).update({
        lastActivate: ['exp', 'CURRENT_TIMESTAMP()'],
        status: 1
      });
    } else {
      return this.where({staffId: staffId, userId: userId}).thenAdd({
        userId: userId,
        staffId: staffId,
        lastActivate: ['exp', 'CURRENT_TIMESTAMP()'],
        status: 1,
        messages: []
      });
    }
  }

  async insertMessage(staffId, userId, direction, type, msg) {
    const msgCount = await this.where({staffId: staffId, userId: userId})
      .field('messagesCount').find();
    const msgitem = {};
    msgitem.msg = msg;
    msgitem.index = msgCount.messagesCount;
    const CurrentDate = new Date();
    msgitem.date = CurrentDate.toLocaleDateString();
    msgitem.type = type;
    msgitem.staffId = staffId;
    msgitem.userId = userId;
    msgitem.direction = direction;
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
