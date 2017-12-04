const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.mongo('quickReplyPrivate', 'mongo');
  }
  async getAction() {
    const staffId = this.get('staffId');
    const replies = await this.modelInstance.getItem(staffId);
    return this.success(replies);
  }

  async putAction() {
    const contents = this.get('contents');
    const staffId = this.get('staffId');
    for (const content of contents) {
      const phrase = content.phrase;
      const sentence = content.sentence;
      await this.modelInstance.insertItem(staffId, phrase, sentence);
    }
  }

  async deleteAction() {
    const phrases = this.get('phrases');
    const sentence = this.get('sentence');
    const staffId = this.get('staffId');
    await this.modelInstance.deleteItem(staffId, phrases, sentence);
  }
};
