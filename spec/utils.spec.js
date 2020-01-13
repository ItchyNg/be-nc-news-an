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

describe.only("formatComments", () => {});
