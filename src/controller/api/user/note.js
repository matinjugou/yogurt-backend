const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('note');
  }
  async postAction() {
    const userId = this.post('userId');
    const content = this.post('content');
    const email = this.post('email');

    // const companyId = this.model('user').getCompany(userId);
    const companyId = Number(userId.split('_')[0]);
    const result = await this.modelInstance.addNote(companyId, userId, content, email);
    if (result !== null && result !== undefined) {
      await this.model('company').addNote(companyId);
      return this.success({
        code: 0,
        msg: 'Leave note succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Leave note failed'
      });
    }
  }
};
