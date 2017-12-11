module.exports = class extends think.Model {
  addComment(data) {
    const date = think.datetime(Date.now());
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
  getStaffComments(staffId, startTime, endTime) {
    if (startTime === null || startTime === undefined || endTime === null || endTime === undefined) {
      return this.where({staffId: staffId}).select();
    }
    return this.where({
      staffId: staffId,
      date: ['BETWEEN', startTime, endTime]
    }).select();
  }
  getCommentById(commentId) {
    return this.where({id: commentId}).find();
  }
  deleteComments(commentIds) {
    return this.where({id: ['IN', commentIds]}).delete();
  }
  getStaffUserComments(staffId, userId, startTime, endTime) {
    if (startTime !== undefined && endTime !== undefined && userId !== undefined) {
      return this.where({
        staffId: staffId,
        userId: userId,
        date: ['BETWEEN', startTime, endTime]
      }).select();
    } else if (userId === undefined && startTime !== undefined && endTime !== undefined) {
      return this.where({
        staffId: staffId,
        date: ['BETWEEN', startTime, endTime]
      }).select();
    } else if (userId !== undefined) {
      return this.where({
        staffId: staffId,
        userId: userId
      }).select();
    } else {
      return this.where({
        staffId: staffId
      }).select();
    }
  }
  updateRemark(commentId, remark) {
    return this.thenUpdate({
      remark: remark
    }, {commentId: commentId});
  }
};
