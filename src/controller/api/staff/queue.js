const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }

  async getAction() {
    const staffId = this.get('staffId');
    const queue = await this.mongo('sessionPair', 'mongo').getQueue(staffId);
    return this.success({
      queue: queue,
      code: 0
    });
  };
};
