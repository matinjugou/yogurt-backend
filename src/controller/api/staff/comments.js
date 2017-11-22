const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('comments');
  }
  async getAction() {
    const staffId = this.get('staffId');
    const userId = this.get('userId');
    const startTime = this.get('startTime');
    const endTime = this.get('endTime');

    if (startTime !== undefined && endTime !== undefined && userId !== undefined) {
      const comments = await this.modelInstance.where({
        staffId: staffId,
        userId: userId,
        date: ['BETWEEN', startTime, endTime]
      }).select();
      return this.success(comments);
    } else if (userId === undefined && startTime !== undefined && endTime !== undefined) {
      const comments = await this.modelInstance.where({
        staffId: staffId,
        date: ['BETWEEN', startTime, endTime]
      }).select();
      return this.success(comments);
    } else if (userId !== undefined) {
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
    const commentId = this.get('commentId');
    const remark = this.get('remark');

    await this.modelInstance.where({
      id: commentId
    }).update({remark: remark});
  }
};
