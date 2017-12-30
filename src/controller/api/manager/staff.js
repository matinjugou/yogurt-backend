const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const staffs = await this.modelInstance.getStaffs(companyId);
    return this.success(staffs);
  }
  async postAction() {
    // const post = this.ctx.request.body.post;
    // const number = post.number;
    const number = this.post('number');
    const companyId = this.post('companyId');
    // const companyId = post.companyId;
    const list = this.modelInstance.addStaff(number, companyId);
    return this.success(list);
  }
  async putAction() {
    const staffId = this.post('staffId');
    const role = this.post('role');
    return this.success(await this.modelInstance.updateRole(staffId, role));
  }
  async deleteAction() {
    let stuff = this.ctx.query['stuff[]'];
    if (!Array.isArray(stuff)) {
      stuff = [stuff];
    }
    return this.success(await this.modelInstance.deleteStaff(stuff));
  }
};
