module.exports = class extends think.Model {
  addQuickReply(data) {
    return this.where({
      isPublic: data.isPublic,
      staffId: data.staffId,
      phrase: data.phrase,
      companyId: data.companyId
    }).thenUpdate({
      isPublic: data.isPublic,
      staffId: data.staffId,
      phrase: data.phrase,
      sentence: data.sentence
    });
  }
};
