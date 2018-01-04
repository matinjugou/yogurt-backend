const Base = require('../../rest.js');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }

  async getAction() {
    const userId = this.get('userId');
    // const tags = this.get('tags');
    // const tagList = tags.split(' ');
    const stuff = await this.model('staff').where({
      onlineStatus: 1,
      queueCount: ['<', this.config('maxClient')]
    }).order('queueCount ASC').select();
    if (stuff.length === 0) {
      return this.success({
        msg: 4,
        staff: 'No staff online.'
      });
    }
    /*
    const staffArray = [];
    for (const staff of stuff) {
      for (const tag of tagList) {
        if (tag in staff.role.split(' ')) {
          staffArray.push(staff);
          break;
        }
      }
    }
    const strategies = this.config('strategies')
      .order('level DESC')
      .where({enable: true})
      .select();
    for (const strategy of strategies) {
      if (strategy.name === 'average') {
        staffArray.sort((a, b) => {
          return a.queueCount - b.queueCount;
        });
        const lessCount = staffArray[0].queueCount;
        const tmpList = [];
        for (const staff of staffArray) {
          if (staff.queueCount === lessCount) tmpList.push(staff); else break;
        }
        staffArray = tmpList;
      } else if (strategy.name === 'oldClient') {
        const pairs = this.mongo('sessionPair', 'mongo');
        const tmpList = [];
        for (const staff of staffArray) {
          if (pairs.where({userId: userId, staffId: staff.id}).select() !== []) tmpList.push(staff);
        }
        staffArray = tmpList;
      } else if (strategy.name === 'tagAccuracy') {
        for (const staff of staffArray) {
          staff.score = 0;
          for (const tag of staff.role.split(' ')) {
            const tagIndex = tagList.indexOf(tag);
            if (tagIndex !== -1) {
              staff.score += tagList.length - tagIndex;
            }
          }
          staffArray.sort((a, b) => {
            return a.score - b.score;
          });
        }
      }
    }
    if (staffArray.length === 0) {
      return this.success({
        code: 3,
        msg: 'All staff are busy.'
      });
    }
    const staff = staffArray[0];
    */
    const staff = stuff[0];
    let returnCode = await this.model('staff').insertUser(staff.staffId);
    if (returnCode === 0) {
      return this.success({
        code: 1,
        msg: 'Unexpected error happened'
      });
    }
    const sessionPair = this.mongo('sessionPair', 'mongo');
    returnCode = await sessionPair.initSession(staff.staffId, userId);
    // console.log("returnCode=", returnCode);
    if (returnCode !== 0) {
      // think.websocket.to('staffRoom ' + staff.staffId).emit('newUser', {userId: userId});
      return this.success({
        code: 0,
        msg: staff.staffId,
        data: staff
      });
    } else {
      return this.success({
        code: 1,
        msg: 'Unexpected error happened'
      });
    }
  }
};
