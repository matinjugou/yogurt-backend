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
    const staffId = this.get('staffId');
    let nickname = this.get('nickname');
    let email = this.get('email');
    let tel = this.get('tel');
    let password = this.get('password');
    let picUrl = this.get('picUrl');
    let role = this.get();
    const staff = this.modelInstance.where({
      id: staffId
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
    await this.modelInstance.where({id: staffId}).update({
      nickname: nickname,
      email: email,
      tel: tel,
      password: password,
      picUrl: picUrl,
      role: role
    });
  }
};
