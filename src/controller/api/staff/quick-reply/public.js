const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('quickReply');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const replies = await this.modelInstance.where({
      companyId: companyId,
      isPublic: true
    }).select();
    return this.success(replies);
  }
};
