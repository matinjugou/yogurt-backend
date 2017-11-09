const Base = require('../../rest.js');
const jwt = require('jsonwebtoken');
module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.modelInstance = this.model('user');
  }

  async getAction() {
    const userId = this.get();
    const tags = this.get();
    let tagList = tags.split(' ');
    let stuff = this.model('staff').where({
      onlineStatus: 1,
      queueCount: ['<', this.config('maxClient')]
    }).select();
    let staffArray = [];
    for (let staff of stuff) {
      for (let tag of tagList) {
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
    for (let strategy of strategies) {
      if (strategy.name === 'average') {
        staffArray.sort((a, b) => {
          return a.queueCount - b.queueCount;
        });
        let lessCount = staffArray[0].queueCount;
        let tmpList = [];
        for (let staff of staffArray) {
          if (staff.queueCount === lessCount) {
            tmpList.push(staff);
          }
          else break;
        }
        staffArray = tmpList;
      }
      else if (strategy.name === 'oldClient') {
        let pairs = this.mongo('session-pair');
        let tmpList = [];
        for (let staff of staffArray) {
          if (pairs.where({userId: userId, staffId: staff.id}).select() !== []) {
            tmpList.push(staff);
          }
        }
        staffArray = tmpList;
      }
      else if (strategy.name === 'tagAccuracy') {
        for (let staff of staffArray) {
          staff.score = 0;
          for (let tag of staff.role.split(' ')) {
            let tagIndex = tagList.indexOf(tag);
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
