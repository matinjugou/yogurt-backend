const Base = require('../../rest.js');
const jwt = require('jsonwebtoken');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('manager');
  }

  getAction() {
    const managerId = this.get('managerId');
    const token = this.get('token');
    const self = this;
    jwt.verify(token, this.config('secretKey'), function(err, decode) {
      if (err) {
        return self.success({
          code: 1,
          msg: 'Invalid token'
        });
      } else {
        if (decode.managerId !== managerId) {
          return self.success({
            code: 2,
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
    const managerId = this.post('managerId');
    const password = this.post('password');
    const result = await this.modelInstance.onlineManager(managerId, password);
    if (result === 0) {
      return this.success({
        code: 1,
        msg: 'Wrong Manager Info!'
      });
    } else {
      const token = jwt.sign({managerId: managerId}, this.config('secretKey'));
      return this.success({
        code: 0,
        msg: 'Login successful!',
        token: token
      });
    }
  }
};
