const Base = require('../../restIndex.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const staffs = await this.modelInstance.where({
      companyId: companyId
    }).select();
    this.success(staffs);
  }
  async postAction() {
    const number = this.get('number');
    const companyId = this.get('companyId');
    const list = await this.modelInstance.addStaff(number, companyId);
    return this.success(list);
  }
  async putAction() {
    const staffId = this.get('staffId');
    const role = this.get('role');
    await this.modelInstance.where({id: staffId}).update({role: role});
  }
};
