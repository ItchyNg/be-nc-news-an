exports.formatDates = list => {
  //This utility function should be able to take an array (list) of objects and return a new array. Each item in the new array must have its timestamp converted into a Javascript date object. Everything else in each item must be maintained.
  //hint: Think carefully about how you can test that this has worked - it's not by copying and pasting a sql timestamp from the terminal into your test

  return list.map(({ ...date }) => {
    date.created_at = new Date(date.created_at);
    return date;
  });
};

exports.makeRefObj = list => {
  return "in the";
};

exports.formatComments = (comments, articleRef) => {
  return "utils";
};

// Seeding
// You need to complete the provided seed function to insert the aMisppropriate data into your database.

// Utilising your data manipulation skills, you will also need to complete the utility functions provided - formatDate, makeRefObj, and formatComments for the seed function to work. Instructions on these utility functions are in the utils README.

// Some advice: don't write all the utility functions in one go, write them when you need them in your seed
