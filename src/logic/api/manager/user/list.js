const Base = require('../../../base.js');
module.exports = class extends Base {
  getAction() {
    this.allowMethods = 'get';
    this.rules = {
      companyId: {
        int: {min: 0},
        required: true
      }
    };
  }
};
