const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }
  async getAction() {
    const staffId = this.get();
    const staff = this.modelInstance.where({
      id: staffId
    }).find();
    return this.success(staff);
  }
  async putAction() {
    const staffId = this.get();
    let nickname = this.get();
    let email = this.get();
    let tel = this.get();
    let password = this.get();
    let picUrl = this.get();
    let role = this.get();
    const staff = this.modelInstance.where({
      id: staffId
    }).find();
    if (nickname === null) {
      nickname = staff.nickname;
    }
    if (email === null) {
      email = staff.email;
    }
    if (tel === null) {
      tel = staff.tel;
    }
    if (password === null) {
      password = staff.password;
    }
    if (picUrl === null) {
      picUrl = staff.picUrl;
    }
    if (role === null) {
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
