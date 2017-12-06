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
    let name = this.post('name');
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
    if (name === null || name === undefined) {
      name = staff.name;
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
      name: name,
      email: email,
      tel: tel,
      password: password,
      picUrl: picUrl,
      role: role
    });
  }
};
