const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('manager');
  }
  async getAction() {
    const managerId = this.get();
    const manager = this.modelInstance.where({
      id: managerId
    }).find();
    await this.success(manager);
  }
  async putAction() {
    const managerId = this.get();
    let name = this.get();
    let nickname = this.get();
    let password = this.get();
    let email = this.get();
    let tel = this.get();
    let picUrl = this.get();
    const manager = this.modelInstance.where({
      id: managerId
    }).find();
    if (name === null) {
      name = manager.name;
    }
    if (nickname === null) {
      nickname = manager.nickname;
    }
    if (password === null) {
      password = manager.password;
    }
    if (email === null) {
      email = manager.email;
    }
    if (tel === null) {
      tel = manager.tel;
    }
    if (picUrl === null) {
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
