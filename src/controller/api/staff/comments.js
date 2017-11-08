const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }
  async getAction() {
    //TODO: staff get action
  }
  async postAction() {
    //TODO: staff post remark
  }
};