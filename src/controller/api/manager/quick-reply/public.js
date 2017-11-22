const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('quickReply');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const replies = await this.modelInstance.where({
      companyId: companyId,
      isPublic: true
    }).select();
    return this.success(replies);
  }
  async putAction() {
    const contents = this.get('contents');
    const companyId = this.get('companyId');
    const isPublic = true;
    const staffId = -1;
    for (const content of contents) {
      const phrase = content.phrase;
      const sentence = content.sentence;
      await this.modelInstance.addQuickReply({
        companyId: companyId,
        isPublic: isPublic,
        phrase: phrase,
        sentence: sentence,
        staffId: staffId
      });
    }
  }
  async deleteAction() {
    const phrases = this.get('phrases');
    const isPublic = true;

    await this.modelInstance.where({
      isPublic: isPublic,
      phrase: ['IN', phrases]
    }).delete();
  }
};
