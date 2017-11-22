module.exports = class extends think.Mongo {
  get schema() {
    return {
      userId: Number,
      staffId: Number,
      lastActivate: { type: Date },
      status: Number, // 1 on, 2 waiting, 0 down
      messages: []
    };
  }

  initSession(staffId, userId) {
    const pair = this.where({staffId: staffId, userId: userId}).find();
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

  insertMessage(staffId, userId, msg) {
    const pair = this.where({staffId: staffId, userId: userId}).find();
    const oldMsg = pair.messages;
    oldMsg.push(msg);
    return this.where({staffId: staffId, userId: userId}).update({
      messages: oldMsg
    });
  }
};
