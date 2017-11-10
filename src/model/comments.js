module.exports = class extends think.Model {
  addComment(data) {
    const date = think.dateTime();
    return this.where({
      userId: data.userId,
      staffId: data.staffId,
      date: date
    }).thenAdd({
      userId: data.userId,
      staffId: data.staffId,
      content: data.content,
      star: data.star,
      date: date
    });
  }
};
