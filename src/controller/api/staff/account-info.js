const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }
  async getAction() {
    const staffId = this.get('staffId');
    const staff = await this.modelInstance.getSingleStaff(staffId);
    return this.success({staff: staff});
  }
  putAction() {
    const staffId = this.post('staffId');
    const nickname = this.post('nickname');
    const email = this.post('email');
    const tel = this.post('tel');
    const password = this.post('password');
    const picUrl = this.post('picUrl');
    const role = this.post('role');
    const result = this.modelInstance.updateStaff(staffId, nickname, email, tel, password, picUrl, role);
    if (result >= 0) {
      return this.success({
        code: 0,
        msg: 'Modify succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Modify failed'
      });
    }
  }
  async postAction() {
    const staffId = this.post('staffId');
    const nickname = this.post('nickname');
    const name = this.post('name');
    const email = this.post('email');
    const tel = this.post('tel');
    const password = this.post('password');
    const picUrl = this.post('picUrl');
    const role = this.post('role');
    const result = await this.modelInstance.initStaff(staffId, nickname, name, email, tel, password, picUrl, role);
    if (result > 0) {
      return this.success({
        code: 0,
        msg: 'Init succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Init failed'
      });
    }
  }
};
