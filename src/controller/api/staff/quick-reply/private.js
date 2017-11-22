const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('quickReply');
  }
  async getAction() {
    const staffId = this.get('staffId');

    const replies = this.modelInstance.where({
      staffId: staffId,
      isPublic: false
    }).select();
    return this.success(replies);
  }
  async putAction() {
    const staffId = this.get('staffId');
    const contents = this.get('contents');
    const companyId = this.get('companyId');
    const isPublic = false;

    for (const content of contents) {
      const phrase = content.phrase;
      const sentence = content.sentence;
      await this.modelInstance.addQuickReply({
        isPublic: isPublic,
        staffId: staffId,
        phrase: phrase,
        sentence: sentence,
        companyId: companyId
      });
    }
  }
  async deleteAction() {
    const staffId = this.get('staffId');
    const phrases = this.get('phrases');

    await this.modelInstance.where({
      staffId: staffId,
      phrase: ['IN', phrases]
    }).delete();
  }
};
