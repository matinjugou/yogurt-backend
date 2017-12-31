const Base = require('../../base.js');
module.exports = class extends Base {
  getAction() {
    this.allowMethods = 'get';
    this.rules = {
      managerId: {
        string: true,
        required: true,
        trim: true
      }
    };
  }
  putAction() {
    this.allowMethods = 'put,post';
    this.rules = {
      managerId: {
        string: true,
        required: true,
        trim: true
      }
    };
  }
};
