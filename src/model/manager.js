module.exports = class extends think.Model {
  getManager(managerId) {
    return this.where({
      managerId: managerId
    }).find();
  }
  updateManager(managerId, name, nickname, password, email, tel, picUrl) {
    return this.where({managerId: managerId}).update({
      name: name,
      nickname: nickname,
      password: password,
      email: email,
      tel: tel,
      picUrl: picUrl
    });
  }
  async onlineManager(managerId) {
    const result = await this.where({managerId: managerId, onlineStatus: 0})
      .update({
        onlineStatus: 1
      });
    return result;
  }
  offlineStaff(managerId) {
    this.where({managerId: managerId, onlineStatus: 1})
      .update({
        onlineStatus: 0
      });
    return 0;
  }
};
