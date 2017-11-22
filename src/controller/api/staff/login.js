const Base = require('../../rest.js');
const jwt = require('jsonwebtoken');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }

  async getAction() {
    const staffId = this.get('staffId');
    const password = this.get('password');
    const staff = this.modelInstance.where({staffId: staffId, password: password}).find();
    if (staff.length === 0) {
      return this.success({
        code: -1,
        msg: 'Staff does not exist!'
      });
    } else {
      const token = jwt.sign({staffId: staffId}, this.ctx.config('secretKey'));
      return this.success({
        code: 0,
        msg: 'Login successful!',
        token: token
      });
    }
  }
};
