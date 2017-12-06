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
    const staffId = this.get('staffId');
    const role = this.get('role');
    await this.modelInstance.where({id: staffId}).update({role: role});
  }
};
