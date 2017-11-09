module.exports = class extends think.Model {
  addQuickReply(data) {
    return this.where({
      isPublic: data.isPublic,
      staffid: data.staffid,
      phrase: data.phrase
    }).thenUpdate({
      isPublic: data.isPublic,
      staffid: data.staffid,
      phrase: data.phrase,
      sentence: data.sentence
    });
  }
};
