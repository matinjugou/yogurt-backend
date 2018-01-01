module.exports = class extends think.Model {
  getCompany(companyId) {
    return this.where({
      id: companyId
    }).find();
  }
  updateCompany(companyId, name, picUrl, robotAvatar, corpusFile, robotWelcome) {
    this.thenUpdate({
      name: name,
      picUrl: picUrl,
      robotAvatar: robotAvatar,
      corpusFile: corpusFile,
      robotWelcome: robotWelcome
    }, {id: companyId});
    return this.where({id: companyId}).find();
  }
  getCorpus(companyId) {
    return this.where({id: companyId}).field('CorpusFile').find();
  }
};
