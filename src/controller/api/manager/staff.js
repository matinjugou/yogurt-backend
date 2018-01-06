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
    const result = await this.modelInstance.updateRole(staffId, role);
    if (result !== undefined && result !== null) {
      return this.success({
        code: 0,
        msg: 'Update succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Update failed'
      });
    }
  }
  async deleteAction() {
    let stuff = this.ctx.query['stuff[]'];
    if (!Array.isArray(stuff)) {
      stuff = [stuff];
    }
    const result = await this.modelInstance.deleteStaff(stuff);
    if (result !== null && result !== undefined && result > 0) {
      return this.success({
        code: 0,
        msg: 'Delete succeeded'
      });
    } else {
      return this.success({
        code: 0,
        msg: 'Delete failed'
      });
    }
  }
};
