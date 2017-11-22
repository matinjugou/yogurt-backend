const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const users = this.modelInstance.where({
      companyId: companyId
    }).select();
    return this.success(users);
  }
};
