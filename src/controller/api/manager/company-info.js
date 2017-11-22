const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('company');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const company = this.modelInstance.where({id: companyId}).find();
    return this.success(company);
  }
  async putAction() {
    const companyId = this.get('companyId');
    let name = this.get('name');
    let picUrl = this.get('picUrl');
    const company = this.modelInstance.where({id: companyId}).find();
    if (name === null) {
      name = company.name;
    }
    if (picUrl === null) {
      picUrl = company.picUrl;
    }
    await this.modelInstance.where({id: companyId}).update({
      name: name,
      picUrl: picUrl
    });
  }
};
