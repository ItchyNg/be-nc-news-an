exports.formatDates = list => {
  //This utility function should be able to take an array (list) of objects and return a new array. Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.
  //hint: Think carefully about how you can test that this has worked - it's not by copying and pasting a sql timestamp from the terminal into your test

  return list.map(({ ...changeDate }) => {
    changeDate.created_at = new Date(changeDate.created_at);
    return changeDate;
  }); //need to also include something so it returns when create_at column is not found!!!!!!!!!!!><><><><><<<<<<<<<<<<<
};

exports.makeRefObj = (list, objKey, objValue) => {
  //should it just be list?

  //   This utility function should be able to take an array (list) of objects and return a reference object. The reference object must be keyed by each item's title, with the values being each item's corresponding id. e.g.
  // [{ article_id: 1, title: 'A' }]
  // will become
  // { A: 1 }

  return list.reduce(function(obj, details) {
    obj[`${details[objKey]}`] = details[objValue];
    return obj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  // This utility function should be able to take an array of comment objects (comments) and a reference object, and return a new array of formatted comments.
  // Each formatted comment must have:
  // *Its created_by property renamed to an author key
  // *Its belongs_to property renamed to an article_id key
  // *The value of the new article_id key must be the id corresponding to the original title value provided
  // *Its created_at value converted into a javascript date object
  // *The rest of the comment's properties must be maintained

  return !comments
    ? []
    : comments.map(function({ ...obj }) {
        // try to use refObj?
        for (let keys in articleRef) {
          //renamed article_id and puts in the value
          if (obj.belongs_to === keys) {
            obj.article_id = articleRef[keys];
            delete obj.belongs_to;
          }
        } //end of for...in loop

        obj.author = obj.created_by; //changes the author key
        delete obj.created_by;

        obj.created_at = new Date(obj.created_at); //converts the timestamp
        return obj;
      });
};

// Seeding
// You need to complete the provided seed function to insert the aMisppropriate data into your database.

// Utilising your data manipulation skills, you will also need to complete the utility functions provided - formatDate, makeRefObj, and formatComments for the seed function to work. Instructions on these utility functions are in the utils README.

// Some advice: don't write all the utility functions in one go, write them when you need them in your seed
