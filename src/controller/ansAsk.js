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
    const companies = await this.model('company').select();
    for (const company of companies) {
      let totalAns = 0;
      let totalAsk = 0;
      let totalServeCount = 0;
      const id = company.id;
      const stuff = await this.model('staff').where({companyId: id}).select();
      for (const staff of stuff) {
        totalAns += Number(staff.AnsAsk.split('/')[0]);
        totalAsk += Number(staff.AnsAsk.split('/')[1]);
        totalServeCount += staff.totalCount;
      }
      this.model('company').updateStatistic(totalServeCount, String(totalAns) + '/' + String(totalAsk), id);
    }
  }
};
