module.exports = class extends think.Model {
  getCompany(companyId) {
    return this.where({
      id: companyId
    }).find();
  }
  updateCompany(companyId, name, picUrl, robotAvatar) {
    return this.modelInstance.where({id: companyId}).update({
      name: name,
      picUrl: picUrl,
      robotAvatar: robotAvatar
    });
  }
};
