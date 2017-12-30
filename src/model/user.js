module.exports = class extends think.Model {
  getAllUsers(companyId) {
    return this.where({companyId: companyId}).select();
  }

  getCompany(userId) {
    const user = this.where({userId: userId}).find();
    return user.companyId;
  }
};
