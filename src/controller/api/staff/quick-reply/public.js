const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.mongo('quickReplyPublic', 'mongo');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const replies = await this.modelInstance.getItem(companyId);
    return this.success(replies);
  }
};
