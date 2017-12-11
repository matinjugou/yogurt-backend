module.exports = class extends think.Model {
  async addStaff(number, companyId) {
    const list = [];
    let i = 0;
    for (i = 0; i < number; i++) {
      const id = await this.add({
        companyId: companyId,
        isInit: 0,
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
      const staffId = String(companyId) + '_s' + String(id);
      await this.thenUpdate({staffId: staffId, password: staffId}, {id: id});
      list.push(staffId);
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
        servingCount: ['exp', 'servingCount+1'],
        queueCount: ['exp', 'queueCount+1']
      });
  }
  awakeStaff(staffId) {
    this.thenUpdate({
      onlineStatus: 1
    }, {staffId: staffId, onlineStatus: 2});
    return 0;
  }
  restStaff(staffId) {
    this.thenUpdate({
      onlineStatus: 2
    }, {staffId: staffId, onlineStatus: 1});
    return 0;
  }
  async onlineStaff(staffId) {
    const result = await this.thenUpdate({
      onlineStatus: 1
    }, {staffId: staffId, onlineStatus: 0});
    return result;
  }
  offlineStaff(staffId) {
    this.thenUpdate({
      onlineStatus: 0
    }, {staffId: staffId, onlineStatus: 1});
    return 0;
  }
  updateRole(staffId, role) {
    return this.thenUpdate({role: role}, {staffId: staffId});
  }
  getStaffs(companyId) {
    return this.where({
      companyId: companyId
    }).field('staffId,name,nickname,email,tel,isInit,onlineStatus,role').select();
  }
  getSingleStaff(staffId) {
    return this.where({
      staffId: staffId
    }).field('staffId,companyId,nickname,name,email,tel,picUrl,role').find();
  }
  updateStaff(staffId, nickname, email, tel, password, picUrl, role) {
    const staff = this.where({staffId: staffId}).find();
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
    return this.thenUpdate({
      nickname: nickname,
      email: email,
      tel: tel,
      password: password,
      picUrl: picUrl,
      role: role
    }, {staffId: staffId});
  }
  initStaff(staffId, nickname, name, email, tel, password, picUrl, role) {
    return this.thenUpdate({
      nickname: nickname,
      name: name,
      email: email,
      tel: tel,
      password: password,
      picUrl: picUrl,
      role: role,
      isInit: 1
    }, {staffId: staffId});
  }
};
