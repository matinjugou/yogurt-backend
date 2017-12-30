const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('note');
  }

  async getAction() {
    const companyId = this.get('companyId');
    const notes = await this.modelInstance.getItems(companyId);
    return this.success(notes);
  }

  async postAction() {
    const noteId = this.post('noteId');
    const staffId = this.post('staffId');
    const reply = this.post('reply');
    const email = this.modelInstance.getEmail(noteId);
    const content = this.modelInstance.getContent(noteId);
    this.sendEmail({
      service: '163',
      auth: {
        user: 'thss15_huangc@163.com',
        pass: 'bh7z7h4t'
      }
    }, {
      from: 'thss15_huangc@163.com',
      to: email,
      subject: '留言回复邮件',
      html: '<p>您的留言</p>' +
      '<p>' + content + '</p>' +
      '<p>已经收到回复：</p>' +
      '<p>' + reply + '</p>' +
      '<p>这是一封留言回复邮件，如果您不知情请忽略。</p>'
    });

    await this.modelInstance.updateNote(noteId, staffId, reply);
  }
};
