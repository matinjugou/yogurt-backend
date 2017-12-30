const Base = require('../../base.js');
module.exports = class extends Base {
  getAction() {
    this.allowMethods = 'get';
  }
  postAction() {
    this.allowMethods = 'post';
  }
};