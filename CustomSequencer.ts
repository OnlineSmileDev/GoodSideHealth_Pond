const TestSequencer = require('@jest/test-sequencer').default

const pathNumberExtractor = (orderPath) =>
  Number(orderPath.split(`specs`)[1].slice(1, 2))

// https://jestjs.io/docs/en/configuration#testsequencer-string
class CustomSequencer extends TestSequencer {
  sort(tests) {
    const testorder = tests.sort((testA, testB) => {
      const indexA = pathNumberExtractor(testA.path)
      const indexB = pathNumberExtractor(testB.path)
      if (indexA === indexB) return 0 // do not swap when tests both not specify in order.

      // Testing reversed pattern
      // if (indexA === -1) return 1;
      // if (indexB === -1) return -1;
      // return indexA < indexB ? -1 : 1;

      if (indexA === -1) return -1
      if (indexB === -1) return 1
      return indexA < indexB ? 1 : -1
    })
    return testorder
  }
}

module.exports = CustomSequencer
