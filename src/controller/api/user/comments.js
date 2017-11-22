const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }
  async postAction() {
    const userId = this.get('userId');
    const staffId = this.get('staffId');
    const content = this.get('content');
    const star = this.get('star');
    await this.model('comments').addComment({
      userId: userId,
      staffId: staffId,
      content: content,
      star: star
    });
  }
};
