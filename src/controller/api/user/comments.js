const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('comments');
  }
  async postAction() {
    const userId = this.post('userId');
    const staffId = this.post('staffId');
    const content = this.post('content');
    const star = this.post('star');
    const result = await this.modelInstance.addComment({
      userId: userId,
      staffId: staffId,
      content: content,
      star: star
    });
    if (result !== null && result !== undefined) {
      return this.success({
        code: 0,
        msg: 'Add succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Add failed'
      });
    }
  }
};
