module.exports = class extends think.Mongo {
  get schema() {
    return {
      staffId: Number,
      pairs: []
    };
  }

  getItem(staffId) {
    return this.where({staffId: staffId}).field('pairs').select();
  }

  insertItem(staffId, phrase, sentence) {
    const pair = {};
    pair.phrase = phrase;
    pair.sentence = sentence;
    return this.where({staffId: staffId}).update({
      '$push': { pairs: pair }
    });
  }

  deleteItem(staffId, phrase, sentence) {
    const pair = {};
    pair.phrase = phrase;
    pair.sentence = sentence;
    return this.where({staffId: staffId}).update({
      '$pull': { pairs: pair }
    });
  }
};
