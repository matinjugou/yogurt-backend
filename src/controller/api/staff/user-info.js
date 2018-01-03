const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }
  async getAction() {
    const userId = this.get('userId');
    const user = await this.modelInstance.getUser(userId);
    return this.success({user: user});
  }
};
