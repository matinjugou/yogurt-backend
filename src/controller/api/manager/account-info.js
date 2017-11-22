const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('manager');
  }
  async getAction() {
    const managerId = this.get('managerId');
    const manager = this.modelInstance.where({
      id: managerId
    }).find();
    await this.success(manager);
  }
  async putAction() {
    const managerId = this.get('managerId');
    let name = this.get('name');
    let nickname = this.get('nickname');
    let password = this.get('password');
    let email = this.get('email');
    let tel = this.get('tel');
    let picUrl = this.get('picUrl');
    const manager = this.modelInstance.where({
      id: managerId
    }).find();
    if (name === null || name === undefined) {
      name = manager.name;
    }
    if (nickname === null || nickname === undefined) {
      nickname = manager.nickname;
    }
    if (password === null || password === undefined) {
      password = manager.password;
    }
    if (email === null || email === undefined) {
      email = manager.email;
    }
    if (tel === null || tel === undefined) {
      tel = manager.tel;
    }
    if (picUrl === null || picUrl === undefined) {
      picUrl = manager.picUrl;
    }
    await this.modelInstance.where({id: managerId}).update({
      name: name,
      nickname: nickname,
      password: password,
      email: email,
      tel: tel,
      picUrl: picUrl
    });
  }
};
