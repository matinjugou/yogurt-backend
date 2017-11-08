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

    const comments = await this.modelInstance.where({
      staffid: staffid,
      userid: userid,
      date: ['BETWEEN', startTime, endTime]
    }).select();

    return this.success(comments);
  }
  async putAction() {
    const {commentid} = this.get();
    const {remark} = this.get();

    await this.modelInstance.where({
      id: commentid
    }).update({remark: remark});
  }
};
