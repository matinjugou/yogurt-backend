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
  getAllCompanies() {
    return this.field('id,name,managerId').select();
  }
  async addCompany(name) {
    const id = await this.add({
      name: name,
      picUrl: '',
      robotAvatar: '',
      managerId: ''
    });
    const managerId = String(id) + '_m1';
    await this.thenUpdate({managerId: managerId}, {id: id});
    return {
      'id': id,
      'managerId': managerId
    };
  }
  async updateStatistic(totalServeCount, totalAnsAsk, id) {
    return this.thenUpdate({totalServeCount: totalServeCount, totalAnsAsk: totalAnsAsk}, {id: id});
  }
  addNote(id) {
    return this.where({id: id})
      .update({
        totalNoteCount: ['exp', 'totalNoteCount+1']
      });
  }
  replyNote(id) {
    return this.where({id: id})
      .update({
        repliedNoteCount: ['exp', 'repliedNoteCount+1']
      });
  }
};
