const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('comments');
  }
  async getAction() {
    const commentId = this.get('commentId');
    if (commentId === null || commentId === undefined) {
      const staffId = this.get('staffId');
      const startTime = this.get('startTime');
      const endTime = this.get('endTime');
      const comments = await this.modelInstance.getStaffComments(staffId, startTime, endTime);
      return this.success(comments);
    }
    const comment = await this.modelInstance.getCommentById(commentId);
    return this.success(comment);
  }
  async deleteAction() {
    const commentIds = this.post('commentIds');
    const result = await this.modelInstance.deleteComments(commentIds);
    if (result !== null && result !== undefined) {
      return this.success({
        code: 0,
        msg: 'Delete succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Delete failed'
      });
    }
  }
};
