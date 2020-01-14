const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when given an empty array", () => {
    expect(formatDates([])).to.deep.equal([]);
  });
  it("returns a converted timestamp into a Javascript date object when given an array of one timestamp in an object", () => {
    const list = [{ created_at: 1479818163389 }];

    const expectedResult = [{ created_at: new Date(1479818163389) }];

    //new Date takes an arguement and set to convert it into a Javascript date format

    expect(formatDates(list)).to.deep.equal(expectedResult);
  });

  it("returns a converted timestamp into a Javascript date object when given an array of one timestamp plus other data in an object ", () => {
    const list = [
      {
        created_by: "x",
        votes: 1,
        created_at: 1479818163389
      }
    ];

    const expectedResult = [
      {
        created_by: "x",
        votes: 1,
        created_at: new Date(1479818163389)
      }
    ];

    expect(formatDates(list)).to.deep.equal(expectedResult);
  });

  it("returns a converted timestamp into a Javascript date object when given an array of multiple timestamps in an object ", () => {
    const list = [{ created_at: 1479818163389 }, { created_at: 1416746163389 }];

    const expectedResult = [
      { created_at: new Date(1479818163389) },
      { created_at: new Date(1416746163389) }
    ];

    expect(formatDates(list)).to.deep.equal(expectedResult);
  });
  it("returns a converted timestamp into a Javascript date object when given an array of multiple timestamps plsu other data in an object ", () => {
    const list = [
      { created_by: "x", votes: 1, created_at: 1479818163389 },
      { created_by: "y", votes: 2, created_at: 1416746163389 }
    ];

    const expectedResult = [
      { created_by: "x", votes: 1, created_at: new Date(1479818163389) },
      { created_by: "y", votes: 2, created_at: new Date(1416746163389) }
    ];

    expect(formatDates(list)).to.deep.equal(expectedResult);
  });

  it("make sure the function does not mutate the original data", () => {
    const list = [{ created_at: 1479818163389 }];

    const listCopy = [{ created_at: 1479818163389 }];

    formatDates(list);

    expect(list).to.deep.equal(listCopy);

    const list2 = [
      { created_by: "x", votes: 1, created_at: 1479818163389 },
      { created_by: "y", votes: 2, created_at: 1416746163389 }
    ];

    const listCopy2 = [
      { created_by: "x", votes: 1, created_at: 1479818163389 },
      { created_by: "y", votes: 2, created_at: 1416746163389 }
    ];

    formatDates(list2);

    expect(list2).to.deep.equal(listCopy2);
  });
});

describe("makeRefObj", () => {
  it("returns an empty object when given an empty array", () => {
    expect(makeRefObj([])).to.deep.equal({});
  });
  it("returns a reference object of keys (title) and values (article_id) pair when given one article", () => {
    const list = [{ article_id: 1, title: "A" }];
    const objKey = "title";
    const objValue = "article_id";
    const expectedResult = { A: 1 };

    expect(makeRefObj(list, objKey, objValue)).to.deep.equal(expectedResult);
  });

  it("returns a reference object of keys (title) and values (article_id) pair when given one article, but with other redundant information", () => {
    const list = [
      { article_id: 1, title: "A", topic: "mitch", author: "icellusedkars" }
    ];
    const objKey = "title";
    const objValue = "article_id";
    const expectedResult = { A: 1 };

    expect(makeRefObj(list, objKey, objValue)).to.deep.equal(expectedResult);
  });
  it("returns a reference object of keys (title) and values (article_id) pair when given an array of multiple articles.", () => {
    const list = [
      { article_id: 1, title: "A", topic: "bob", author: "test" },
      { article_id: 2, title: "B", topic: "mitch", author: "icellusedkars" },
      { article_id: 3, title: "C", topic: "Andrew", author: "bleh" }
    ];
    const objKey = "title";
    const objValue = "article_id";
    const expectedResult = { A: 1, B: 2, C: 3 };

    expect(makeRefObj(list, objKey, objValue)).to.deep.equal(expectedResult);
  });

  it("testing to make sure that the function does not mutate the original data", () => {
    const list = [{ article_id: 1, title: "A" }];
    const listCopy = [{ article_id: 1, title: "A" }];
    const objKey = "title";
    const objValue = "article_id";
    makeRefObj(list, objKey, objValue);

    expect(list).to.deep.equal(listCopy);

    const list2 = [
      { article_id: 1, title: "A", topic: "bob", author: "test" },
      { article_id: 2, title: "B", topic: "mitch", author: "icellusedkars" },
      { article_id: 3, title: "C", topic: "Andrew", author: "bleh" }
    ];
    const listCopy2 = [
      { article_id: 1, title: "A", topic: "bob", author: "test" },
      { article_id: 2, title: "B", topic: "mitch", author: "icellusedkars" },
      { article_id: 3, title: "C", topic: "Andrew", author: "bleh" }
    ];

    makeRefObj(list2, objKey, objValue);

    expect(list2).to.deep.equal(listCopy2);
  });
});

describe.only("formatComments", () => {
  it("returns an empty array when given an empty array of comments", () => {
    const comments = [];
    const articleRef = { A: 1 };

    expect(formatComments(comments, articleRef)).to.deep.equal([]);
  });

  it("returns a new array of formatted comments when passed a array with a single comment object and reference object", () => {
    const comments = [
      {
        body: "body in here",
        belongs_to: "Titletest", //to be renamed to an article_id key with values to be the article_id integer
        created_by: "itch", //to be renamed to an author key
        votes: 10,
        created_at: 1496231984183 //convert this to JS date object
      }
    ];
    const articleRef = { Titletest: 1 }; //Key (Title), Value (article_id)

    const expected = [
      {
        body: "body in here",
        article_id: 1, //renamed to an article_id key with values to be the article_id integer
        author: "itch", //renamed to an author key
        votes: 10,
        created_at: new Date(1496231984183) //converted this to JS date object
      }
    ];

    expect(formatComments(comments, articleRef)).to.deep.equal(expected);
  });

  it("returns a new array of formatted comments when passed a array with a multiple comment objects and reference objects", () => {
    const comments = [
      {
        body: "body in here",
        belongs_to: "Titletest",
        created_by: "itch",
        votes: 10,
        created_at: 1496231984183
      },
      {
        body: "body in here Two",
        belongs_to: "TitletestTwo",
        created_by: "Andy",
        votes: 5,
        created_at: 1502057011385
      }
    ];
    const articleRef = { TitletestTwo: 2, Titletest: 1 };

    const expected = [
      {
        body: "body in here",
        article_id: 1,
        author: "itch",
        votes: 10,
        created_at: new Date(1496231984183)
      },
      {
        body: "body in here Two",
        article_id: 2,
        author: "Andy",
        votes: 5,
        created_at: new Date(1502057011385)
      }
    ];

    expect(formatComments(comments, articleRef)).to.deep.equal(expected);
  });
  it("this checks for mutations in both comments and the reference object", () => {
    const comments = [
      {
        body: "body in here",
        belongs_to: "Titletest",
        created_by: "itch",
        votes: 10,
        created_at: 1496231984183
      }
    ];
    const articleRef = { Titletest: 1 };

    const commentsCopy = [
      {
        body: "body in here",
        belongs_to: "Titletest",
        created_by: "itch",
        votes: 10,
        created_at: 1496231984183
      }
    ];

    const articleRefCopy = { Titletest: 1 };

    formatComments(comments, articleRef);

    expect(comments).to.deep.equal(commentsCopy);
    expect(articleRef).to.deep.equal(articleRefCopy);

    const comments2 = [
      {
        body: "body in here",
        belongs_to: "Titletest",
        created_by: "itch",
        votes: 10,
        created_at: 1496231984183
      },
      {
        body: "body in here Two",
        belongs_to: "TitletestTwo",
        created_by: "Andy",
        votes: 5,
        created_at: 1502057011385
      }
    ];
    const articleRef2 = { Titletest: 1, TitletestTwo: 2 };
    ///////////////////////////////////////////////////////////////////
    const commentsCopy2 = [
      {
        body: "body in here",
        belongs_to: "Titletest",
        created_by: "itch",
        votes: 10,
        created_at: 1496231984183
      },
      {
        body: "body in here Two",
        belongs_to: "TitletestTwo",
        created_by: "Andy",
        votes: 5,
        created_at: 1502057011385
      }
    ];
    const articleRefCopy2 = { Titletest: 1, TitletestTwo: 2 };

    formatComments(comments2, articleRef2);

    expect(comments2).to.deep.equal(commentsCopy2);
    expect(articleRef2).to.deep.equal(articleRefCopy2);
  });
});
