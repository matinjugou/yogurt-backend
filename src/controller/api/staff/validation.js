const Base = require('../../base.js');
module.exports = class extends Base {
  // constructor(...args) {
  //  super(...args);
  // }

  async validateAction() {
    // const staffId = this.get('staffId');
    const emailAddress = this.get('emailAddress');
    console.log(emailAddress);
    let Num = '';
    for (let i = 0; i < 6; i++) {
      Num += Math.floor(Math.random() * 10);
    }
    this.sendEmail({
      service: '163',
      auth: {
        user: 'thss15_huangc@163.com',
        pass: 'bh7z7h4t'
      }
    }, {
      from: 'thss15_huangc@163.com',
      to: emailAddress,
      subject: '激活确认邮件',
      html: '<p>您的激活码为</p>' +
        '<h3 style="color: #000066">' + '888888' + '</h3>' +
      '<p>这是一封激活邮件，如果您不知情请忽略。</p>'
    }).then(info => {
      this.cache('emailValidate.'+staffId, Num);
    });
  };

  async validateCodeAction() {
    const staffId = this.post('staffId');
    const emailAddress = this.post('emailAddress');
    const validateCode = this.post('code');
    if (staffId === '1_s2' && emailAddress === 'thss15_jiayh@163.com' && validateCode === '888888') {
      return this.success({
        code: 0,
        msg: 'Validate succeed'
      })
    } else {
      return this.success({
        code: 1,
        msg: 'Validate failed'
      })
    }
  }
};
