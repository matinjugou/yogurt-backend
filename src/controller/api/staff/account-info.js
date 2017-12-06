const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }
  async getAction() {
    const staffId = this.get('staffId');
    const staff = this.modelInstance.where({
      id: staffId
    }).find();
    return this.success(staff);
  }
  async putAction() {
    const staffId = this.post('staffId');
    let nickname = this.post('nickname');
    let email = this.post('email');
    let tel = this.post('tel');
    let password = this.post('password');
    let picUrl = this.post('picUrl');
    let role = this.post('role');
    const staff = this.modelInstance.where({
      staffId: staffId
    }).find();
    if (nickname === null || nickname === undefined) {
      nickname = staff.nickname;
    }
    if (email === null || email === undefined) {
      email = staff.email;
    }
    if (tel === null || tel === undefined) {
      tel = staff.tel;
    }
    if (password === null || password === undefined) {
      password = staff.password;
    }
    if (picUrl === null || picUrl === undefined) {
      picUrl = staff.picUrl;
    }
    if (role === null || role === undefined) {
      role = staff.role;
    }
    await this.modelInstance.where({staffId: staffId}).update({
      nickname: nickname,
      email: email,
      tel: tel,
      password: password,
      picUrl: picUrl,
      role: role
    });
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
    const result = await this.modelInstance.thenUpdate({
      nickname: nickname,
      name: name,
      email: email,
      tel: tel,
      password: password,
      picUrl: picUrl,
      role: role,
      isInit: 1
    }, {staffId: staffId});
    if (result > 0) {
      return this.success({
        code: 0,
        msg: 'Init succeed'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Init failed'
      });
    }
  }
};
