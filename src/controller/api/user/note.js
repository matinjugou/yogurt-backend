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

    const companyId = this.model('user').getCompany(userId);
    await this.modelInstance.addNote(companyId, userId, content, email);
  }
};
