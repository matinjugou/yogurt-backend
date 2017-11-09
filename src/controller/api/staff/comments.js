const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('comments');
  }
  async getAction() {
    const {staffid} = this.get();
    const {userid} = this.get();
    const {startTime} = this.get();
    const {endTime} = this.get();

    if (startTime !== null && endTime !== null && userid !== null) {
      const comments = await this.modelInstance.where({
        staffid: staffid,
        userid: userid,
        date: ['BETWEEN', startTime, endTime]
      }).select();
      return this.success(comments);
    } else if (userid === null && startTime !== null && endTime !== null) {
      const comments = await this.modelInstance.where({
        staffid: staffid,
        date: ['BETWEEN', startTime, endTime]
      }).select();
      return this.success(comments);
    } else if (userid !== null) {
      const comments = await this.modelInstance.where({
        staffid: staffid,
        userid: userid
      }).select();
      return this.success(comments);
    } else {
      const comments = await this.modelInstance.where({
        staffid: staffid
      }).select();
      return this.success(comments);
    }
  }
  async putAction() {
    const {commentid} = this.get();
    const {remark} = this.get();

    await this.modelInstance.where({
      id: commentid
    }).update({remark: remark});
  }
};
