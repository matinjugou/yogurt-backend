const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('comments');
  }
  async getAction() {
    const {staffId} = this.get();
    const {userId} = this.get();
    const {startTime} = this.get();
    const {endTime} = this.get();

    if (startTime !== null && endTime !== null && userId !== null) {
      const comments = await this.modelInstance.where({
        staffId: staffId,
        userId: userId,
        date: ['BETWEEN', startTime, endTime]
      }).select();
      return this.success(comments);
    } else if (userId === null && startTime !== null && endTime !== null) {
      const comments = await this.modelInstance.where({
        staffId: staffId,
        date: ['BETWEEN', startTime, endTime]
      }).select();
      return this.success(comments);
    } else if (userId !== null) {
      const comments = await this.modelInstance.where({
        staffId: staffId,
        userId: userId
      }).select();
      return this.success(comments);
    } else {
      const comments = await this.modelInstance.where({
        staffId: staffId
      }).select();
      return this.success(comments);
    }
  }
  async putAction() {
    const {commentId} = this.get();
    const {remark} = this.get();

    await this.modelInstance.where({
      id: commentId
    }).update({remark: remark});
  }
};
