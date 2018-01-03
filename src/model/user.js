module.exports = class extends think.Model {
  getAllUsers(companyId) {
    return this.where({companyId: companyId}).select();
  }

  async getCompany(userId) {
    const user = await this.where({userId: userId}).find();
    return user.companyId;
  }
};
