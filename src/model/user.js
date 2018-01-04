module.exports = class extends think.Model {
  getUser(userId) {
    return this.where({userId: userId}).find();
  }

  getAllUsers(companyId) {
    return this.where({companyId: companyId}).select();
  }

  async getCompany(userId) {
    const user = await this.where({userId: userId}).find();
    return user.companyId;
  }
};
