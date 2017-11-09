const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('comments');
  }
  async getAction() {
    const {commentid} = this.get();
    if (commentid === null || commentid === undefined) {
      const {staffid} = this.get();
      const {startTime} = this.get();
      const {endTime} = this.get();
      if (startTime !== null && endTime !== null) {
        const comments = this.modelInstance.where({
          staffid: staffid,
          date: ['BETWEEN', startTime, endTime]
        }).select();

        return this.success(comments);
      } else {
        const comments = this.modelInstance.where({
          staffid: staffid
        }).select();

        return this.success(comments);
      }
    }
    const comment = this.modelInstance.where({id: commentid}).find();
    return this.success(comment);
  }

  async deleteAction() {
    const {commentids} = this.get();
    await this.modelInstance.where({id: ['IN', commentids]}).delete();
  }
};
