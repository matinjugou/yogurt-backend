module.exports = class extends think.Model {
  getAllUsers(companyId) {
    return this.where({companyId: companyId}).select();
  }
};
