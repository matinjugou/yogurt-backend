const Base = require('../../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.mongo('quickReplyPublic', 'mongo');
  }
  async getAction() {
    const companyId = this.get('companyId');
    const replies = await this.modelInstance.getItem(companyId);
    return this.success(replies.pairs);
  }

  async postAction() {
    const companyId = this.post('companyId');
    const phrase = this.post('phrase');
    const sentence = this.post('sentence');
    const result = await this.modelInstance.insertItem(companyId, phrase, sentence);
    if (result !== null && result !== undefined) {
      return this.success({
        code: 0,
        msg: 'Insert succeeded'
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Insert failed'
      });
    }
  }

  async putAction() {
    const companyId = this.post('companyId');
    const oldPhrase = this.post('oldPhrase');
    const oldSentence = this.post('oldSentence');
    const newPhrase = this.post('newPhrase');
    const newSentence = this.post('newSentence');
    const result = await this.modelInstance.changeItem(companyId, oldPhrase, oldSentence, newPhrase, newSentence);
    if (result === 0) {
      return this.success({
        code: 0,
        msg: 'success'
      });
    } else if (result === -1) {
      return this.success({
        code: 1,
        msg: 'value doesn\'t exist'
      });
    } else if (result === -2) {
      return this.success({
        code: 2,
        msg: 'duplicated value'
      });
    }
  }

  async deleteAction() {
    let pairs = this.ctx.query['pairs[]'];
    const companyId = this.ctx.query['companyId'];
    if (!Array.isArray(pairs)) {
      pairs = [pairs];
    }
    for (let pair of pairs) {
      pair = JSON.parse(pair);
      await this.modelInstance.deleteItem(companyId, pair['phrase'], pair['sentence']);
    }
    return this.success({
      code: 0,
      msg: 'deleted'
    });
  }
};
