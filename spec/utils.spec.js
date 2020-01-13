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

describe("makeRefObj", () => {});

describe("formatComments", () => {});
