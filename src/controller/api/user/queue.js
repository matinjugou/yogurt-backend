const Base = require('../../rest.js');
// const jwt = require('jsonwebtoken');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }

  async getAction() {
    const userId = this.get();
    const tags = this.get();
    const tagList = tags.split(' ');
    const stuff = this.model('staff').where({
      onlineStatus: 1,
      queueCount: ['<', this.config('maxClient')]
    }).select();
    let staffArray = [];
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
        const pairs = this.mongo('session-pair');
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
  }
};
