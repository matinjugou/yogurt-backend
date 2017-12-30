module.exports = class extends think.Mongo {
  get schema() {
    return {
      companyId: Number,
      pairs: []
    };
  }

  getItem(companyId) {
    return this.where({companyId: Number(companyId)}).field('pairs').find();
  }

  insertItem(companyId, phrase, sentence) {
    const pair = {};
    pair.phrase = phrase;
    pair.sentence = sentence;
    return this.where({companyId: companyId}).update({
      '$push': { pairs: pair }
    });
  }

  async changeItem(companyId, oldPhrase, oldSentence, newPhrase, newSentence) {
    const oldPair = {};
    const newPair = {};
    oldPair.phrase = oldPhrase;
    oldPair.sentence = oldSentence;
    newPair.phrase = newPhrase;
    newPair.sentence = newSentence;
    const result = await this.where({companyId: companyId}).update({
      '$pull': { pairs: oldPair }
    });
    if (result > 0) {
      this.where({companyId: companyId}).update({
        '$push': {pairs: newPair}
      });
      return 0;
    } else {
      return -1;
    }
  }

  async deleteItem(companyId, phrase, sentence) {
    const pair = {};
    pair.phrase = phrase;
    pair.sentence = sentence;
    return this.where({companyId: Number(companyId)}).update({
      '$pull': { pairs: pair }
    });
  }
};
