const Base = require('../../rest.js');
const jwt = require('jsonwebtoken');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('staff');
  }

  getAction() {
    const staffId = this.get('staffId');
    const token = this.get('token');
    const self = this;
    jwt.verify(token, this.config('secretKey'), function(err, decode) {
      if (err) {
        return self.success({
          code: -1,
          msg: 'Invalid token'
        });
      } else {
        if (decode.staffId !== staffId) {
          return self.success({
            code: -2,
            msg: 'Info mismatch!'
          });
        }
        return self.success({
          code: 0,
          msg: 'Correct token'
        });
      }
    });
  }

  async postAction() {
    const staffId = this.post('staffId');
    const password = this.post('password');
    const staff = await this.modelInstance.validateStaff(staffId, password);
    if (Object.keys(staff).length === 0) {
      return this.success({
        code: -1,
        msg: 'Staff does not exist!'
      });
    } else {
      const token = jwt.sign({staffId: staffId}, this.config('secretKey'));
      return this.success({
        code: 0,
        msg: 'Login successful!',
        token: token
      });
    }
  }
};
