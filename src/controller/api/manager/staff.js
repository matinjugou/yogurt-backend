const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }
  async getAction() {
    const companyId = this.get();
    const role = this.get();
    const staffs = this.modelInstance.where({
      companyId: companyId,
      role: role
    }).select();
    this.success(staffs);
  }
  async postAction() {
    const number = this.get();
    const companyId = this.get();
    const list = await this.modelInstance.addStaff(number, companyId);
    return this.success(list);
  }
  async putAction() {
    const staffId = this.get();
    const role = this.get();
    await this.modelInstance.where({id: staffId}).update({role: role});
  }
};
