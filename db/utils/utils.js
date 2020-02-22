exports.formatDates = list => {
  return list.map(({ ...changeDate }) => {
    changeDate.created_at = new Date(changeDate.created_at);
    return changeDate;
  });
};

exports.makeRefObj = (list, objKey, objValue) => {
  return list.reduce(function(obj, details) {
    obj[`${details[objKey]}`] = details[objValue];
    return obj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return !comments
    ? []
    : comments.map(function({ ...obj }) {
        for (let keys in articleRef) {
          if (obj.belongs_to === keys) {
            obj.article_id = articleRef[keys];
            delete obj.belongs_to;
          }
        }

        obj.author = obj.created_by;
        delete obj.created_by;

        obj.created_at = new Date(obj.created_at);
        return obj;
      });
};
