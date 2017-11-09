const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('quickReply');
  }
  async getAction() {
    const replies = await this.modelInstance.where({
      isPublic: true
    }).select();
    return this.success(replies);
  }
  async putAction() {
    const {contents} = this.get();
    const isPublic = true;
    const staffid = -1;
    for (const content of contents) {
      const phrase = content.phrase;
      const sentence = content.sentence;
      await this.modelInstance.addQuickReply({
        isPublic: isPublic,
        phrase: phrase,
        sentence: sentence,
        staffid: staffid
      });
    }
  }
  async deleteAction() {
    const {phrases} = this.get();
    const isPublic = true;

    await this.modelInstance.where({
      isPublic: isPublic,
      phrase: ['IN', phrases]
    }).delete();
  }
};
