const Base = require('../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('quickReply');
  }
  async getAction() {
    const {staffid} = this.get();

    const replies = this.modelInstance.where({
      staffid: staffid,
      isPublic: false
    }).select();
    return this.success(replies);
  }
  async putAction() {
    const {staffid} = this.get();
    const {contents} = this.get();
    const isPublic = false;

    for (const content of contents) {
      const phrase = content.phrase;
      const sentence = content.sentence;
      await this.modelInstance.addQuickReply({
        isPublic: isPublic,
        staffid: staffid,
        phrase: phrase,
        sentence: sentence
      });
    }
  }
};
