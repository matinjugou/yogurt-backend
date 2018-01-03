const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }

  async getAction() {
    const companyId = this.get('companyId');
    const stuff = await this.modelInstance.getOnlineStaffs(Number(companyId));
    const result = [];
    for (const staff of stuff) {
      result.push(staff.staffId);
    }
    return this.success({
      stuff: result,
      code: 0
    });
  };
};
