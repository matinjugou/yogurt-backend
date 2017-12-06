module.exports = class extends think.Model {
  getManager(managerId) {
    return this.where({
      managerId: managerId
    }).field('companyId,name,email,nickname,picUrl,managerId').find();
  }
  updateManager(managerId, name, nickname, password, email, tel, picUrl) {
    return this.thenUpdate({
      name: name,
      nickname: nickname,
      password: password,
      email: email,
      tel: tel,
      picUrl: picUrl
    }, {managerId: managerId});
  }
  async onlineManager(managerId, password) {
    const result = await this.thenUpdate({
      onlineStatus: 1
    }, {managerId: managerId, password: password});
    return result;
  }
  offlineStaff(managerId) {
    this.thenUpdate({
      onlineStatus: 0
    }, {managerId: managerId, onlineStatus: 1});
    return 0;
  }
};
