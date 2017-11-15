const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('comments');
  }
  async getAction() {
    const commentId = this.get();
    if (commentId === null || commentId === undefined) {
      const staffId = this.get();
      const startTime = this.get();
      const endTime = this.get();
      if (startTime !== null && endTime !== null) {
        const comments = this.modelInstance.where({
          staffId: staffId,
          date: ['BETWEEN', startTime, endTime]
        }).select();

        return this.success(comments);
      } else {
        const comments = this.modelInstance.where({
          staffId: staffId
        }).select();

        return this.success(comments);
      }
    }
    const comment = this.modelInstance.where({id: commentId}).find();
    return this.success(comment);
  }
  async deleteAction() {
    const commentIds = this.get();
    await this.modelInstance.where({id: ['IN', commentIds]}).delete();
  }
};
