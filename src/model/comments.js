module.exports = class extends think.Model {
  addComment(data) {
    const date = think.dateTime();
    return this.where({
      userid: data.userid,
      staffid: data.staffid,
      date: date
    }).thenAdd({
      userid: data.userid,
      staffid: data.staffid,
      content: data.content,
      star: data.star,
      date: date
    });
  }
};
