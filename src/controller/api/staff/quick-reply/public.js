const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('quickReply');
  }
  async getAction() {
    const replies = await this.modelInstance.where({
      isPublic: true
    }).select();
    return this.success(replies);
  }
};
