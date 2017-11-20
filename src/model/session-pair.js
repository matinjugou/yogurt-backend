module.exports = class extends think.Mongo {
  get schema() {
    return {
      userId: Number,
      staffId: Number,
      lastActivate: { type: Date },
      status: Number, // 0 on, 1 waiting, 2 down
      messages: []
    };
  }

  initSession(data) {

  }

  insertMessage(data) {

  }
};
