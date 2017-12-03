module.exports = class extends think.Model {
  addStaff(number, companyId) {
    const list = [];
    let i = 0;
    for (i = 0; i < number; i++) {
      list[i] = this.add({
        companyId: companyId,
        isInit: false,
        name: '',
        email: '',
        tel: '',
        nickname: '',
        password: '',
        picUrl: '',
        role: '',
        onlineStatus: 0,
        servingCount: 0,
        waitingCount: 0,
        queueCount: 0
      });
    }
    return list;
  }
  validateStaff(staffId, password) {
    const ans = this.where({staffId: staffId, password: password}).find();
    return ans;
  }
  insertUser(staffId) {
    return this.where({staffId: staffId})
      .update({
        waitingCount: ['exp', 'waitingCount+1'],
        queueCount: ['exp', 'queueCount+1']
      });
  }
  awakeStaff(staffId) {
    this.where({staffId: staffId, onlineStatus: 2})
      .update({
        onlineStatus: 1
      });
    return 0;
  }
  restStaff(staffId) {
    this.where({staffId: staffId, onlineStatus: 1})
      .update({
        onlineStatus: 2
      });
    return 0;
  }
  async onlineStaff(staffId) {
    const result = await this.where({staffId: staffId, onlineStatus: 0})
      .update({
        onlineStatus: 1
      });
    return result;
  }
  offlineStaff(staffId) {
    this.where({staffId: staffId, onlineStatus: 1})
      .update({
        onlineStatus: 0
      });
    return 0;
  }
};
