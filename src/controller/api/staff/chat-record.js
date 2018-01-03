const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.mongo('sessionPair', 'mongo');
  }

  async getAction() {
    const userId = this.get('userId');
    const staffId = this.get('staffId');
    const index = this.get('index');
    const result = await this.modelInstance.getRecords(staffId, userId, index);
    return this.success(result);
  }
};
