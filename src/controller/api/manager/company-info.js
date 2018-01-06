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
    let corpusFile = this.post('corpusFile');
    let robotWelcome = this.post('robotWelcome');
    const company = await this.modelInstance.getCompany(companyId);
    if (company === null || company === undefined || company.keys('id').length === 0) {
      return this.success({
        code: 2,
        msg: 'Update failed, cannot get the company'
      });
    }
    if (name === null || name === undefined) {
      name = company.name;
    }
    if (picUrl === null || picUrl === undefined) {
      picUrl = company.picUrl;
    }
    if (robotAvatar === null || robotAvatar === undefined) {
      robotAvatar = company.robotAvatar;
    }
    if (corpusFile === null || corpusFile === undefined) {
      corpusFile = company.corpusFile;
    }
    if (robotWelcome === null || robotWelcome === undefined) {
      robotWelcome = company.robotWelcome;
    }
    const result = await this.modelInstance.updateCompany(companyId, name, picUrl, robotAvatar, corpusFile, robotWelcome);
    if (result !== null && result !== undefined && result.keys('id').length !== 0) {
      return this.success({
        code: 0,
        msg: 'Update succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Update failed'
      });
    }
  }
};
