const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('manager');
  }
  async getAction() {
    const managerId = this.get('managerId');
    const manager = await this.modelInstance.getManager(managerId);
    return this.success(manager);
  }
  async putAction() {
    const managerId = this.post('managerId');
    let name = this.post('name');
    let nickname = this.post('nickname');
    let password = this.post('password');
    let email = this.post('email');
    let tel = this.post('tel');
    let picUrl = this.post('picUrl');
    const manager = await this.modelInstance.getManager(managerId);
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
    await this.modelInstance.updateManager(managerId, name, nickname, password, email, tel, picUrl);
  }
};
