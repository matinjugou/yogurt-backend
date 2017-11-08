module.exports = class extends think.Mongoose {
  get schema() {
    return {
      userId: Number,
      staffId: Number,
      lastActivate: { type: Date },
      status: Number, // 0 on, 1 waiting, 2 down
      messages: []
    };
  }
};
