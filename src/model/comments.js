module.exports = class extends think.Model {
  addComment(data) {
    const date = think.dateTime();
    return this.where({
      userid: data.userid,
      staffid: data.staffid,
      date: date
    }).thenAdd({
      userid: data.userid,
      staffid: data.userid,
      content: data.userid,
      star: data.star,
      date: date
    });
  }
};
