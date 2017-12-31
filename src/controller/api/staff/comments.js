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

    const comments = await this.modelInstance.getStaffUserComments(staffId, userId, startTime, endTime);
    return this.success(comments);
  }
  async putAction() {
    const commentId = this.post('commentId');
    const remark = this.post('remark');

    const result = await this.modelInstance.updateRemark(commentId, remark);
    if (result !== null && result !== undefined) {
      return this.success({
        code: 0,
        msg: 'Reply succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Reply failed'
      });
    }
  }
};
