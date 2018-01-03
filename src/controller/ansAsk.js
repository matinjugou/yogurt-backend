const Base = require('./base.js');

module.exports = class extends Base {
  async updateAction() {
    const stuff = await this.model('staff').select();
    for (const staff of stuff) {
      let ans = 0;
      let ask = 0;
      const pairs = await this.mongo('sessionPair', 'mongo').where({staffId: staff.staffId}).select();
      for (const pair of pairs) {
        ans += pair.ans;
        ask += pair.ask;
      }
      const AnsAsk = String(ans) + '/' + String(ask);
      this.model('staff').thenUpdate({AnsAsk: AnsAsk}, {staffId: staff.staffId});
    }
  }
};
