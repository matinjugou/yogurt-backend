module.exports = class extends think.Model {
  getRepliedItems(companyId) {
    return this.where({companyId: companyId, isReplied: 1}).select();
  }

  getItems(companyId) {
    return this.where({companyId: companyId, isReplied: 0}).select();
  }

  getEmail(noteId) {
    const note = this.where({id: Number(noteId)}).find();
    return note.email;
  }

  getContent(noteId) {
    const note = this.where({id: Number(noteId)}).find();
    return note.content;
  }

  addNote(companyId, userId, content, email) {
    const date = think.datetime(Date.now());
    return this.add({
      companyId: companyId,
      userId: userId,
      content: content,
      email: email,
      time: date,
      isReplied: 0,
      reply: '',
      staffId: ''
    });
  }

  updateNote(noteId, staffId, reply) {
    return this.thenUpdate({
      staffId: staffId,
      reply: reply,
      isReplied: 1
    }, {id: Number(noteId)});
  }
};
