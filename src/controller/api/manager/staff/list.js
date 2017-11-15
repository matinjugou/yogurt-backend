const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }
  async getAction() {
    // todo: get statistics of staff
  }
  async postAction() {
    const number = this.get();
    const companyId = this.get();
    const list = await this.modelInstance.addStaff(number, companyId);
    return this.success(list);
  }
};
