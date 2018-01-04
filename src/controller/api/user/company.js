const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('company');
  }
  async getAction() {
    const userId = this.get('userId');
    const companyId = Number(userId.split('_')[0]);
    const company = await this.modelInstance.getCompany(companyId);
    return this.success({
      company: company
    });
  }
};
