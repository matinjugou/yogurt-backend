module.exports = class extends think.Model {
  getCompany(companyId) {
    return this.where({
      id: companyId
    }).find();
  }
  updateCompany(companyId, name, picUrl, robotAvatar) {
    this.thenUpdate({
      name: name,
      picUrl: picUrl,
      robotAvatar: robotAvatar
    }, {id: companyId});
    return this.where({id: companyId}).find();
  }
};
