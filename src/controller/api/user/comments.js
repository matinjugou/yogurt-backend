const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }
  async postAction() {
    const {userid} = this.get();
    const {staffid} = this.get();
    const {content} = this.get();
    const {star} = this.get();
    await this.model('comments').addComment({
      userid: userid,
      staffid: staffid,
      content: content,
      star: star
    });
  }
};
