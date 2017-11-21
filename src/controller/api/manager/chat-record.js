const Base = require('../../base.js');
module.exports = class extends Base {
  async getAction() {
    // const userId = this.get();
    // const staffId = this.get();
    // const startTime = this.get();
    // const endTime = this.get();
    const index = this.get();
    // const recordNum = this.get();
    if (index) {
      // const model = this.mongo('session-pair');
      // const pair = await model.where({userId: userId,
      // staffId: staffId}).select()[0];
    } else {
    }
  }
};
