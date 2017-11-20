const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }
  async postAction() {
    const userId = this.get();
    const staffId = this.get();
    const content = this.get();
    const star = this.get();
    await this.model('comments').addComment({
      userId: userId,
      staffId: staffId,
      content: content,
      star: star
    });
  }
};
