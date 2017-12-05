const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('company');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const company = await this.modelInstance.getCompany(companyId);
    return this.success(company);
  }
  async putAction() {
    const companyId = this.post('companyId');
    let name = this.post('name');
    let picUrl = this.post('picUrl');
    let robotAvatar = this.post('robotAvatar');
    const company = await this.modelInstance.getCompany(companyId);
    if (name === null) {
      name = company.name;
    }
    if (picUrl === null) {
      picUrl = company.picUrl;
    }
    if (robotAvatar === null) {
      robotAvatar = company.robotAvatar;
    }
    await this.modelInstance.updateCompany(companyId, name, picUrl, robotAvatar);
  }
};
