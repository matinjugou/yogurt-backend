const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('company');
  }
  async getAction() {
    const companies = await this.modelInstance.getAllCompanies();
    return this.success(companies);
  }
  postAction() {
    const companyName = this.post('companyName');
    const result = this.modelInstance.addCompany(companyName);
    if (result !== null && result !== undefined) {
      const id = this.model('manager').addManager(result['managerId'], result['id']);
      if (id > 0) {
        const data = {
          'companyId': result['id']
        };
        return this.success({
          'code': 0,
          'data': data,
          'msg': ''
        });
      } else {
        return this.success({
          'code': 1,
          'data': '',
          'msg': 'Could not initialize manager'
        });
      }
    } else {
      return this.success({
        'code': 2,
        'data': '',
        'msg': 'Could not initialize company'
      });
    }
  }
};
