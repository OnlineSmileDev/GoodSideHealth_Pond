import { getPhqFlagged, getShadedAnswersCount, getPhqScore } from './utils'

describe('PHQ Screener Utils test suite', () => {
  test('Check PHQ Score', async () => {
    expect(getPhqScore(phqUnflaggedForm)).toBe(4)
    expect(getPhqScore(phqUnflaggedEdgeForm)).toBe(7)
    expect(getPhqScore(phqFlaggedEdgeForm)).toBe(8)
    expect(getPhqScore(phqFlaggedForm)).toBe(14)
    expect(getPhqScore(phqSuicidalForm1)).toBe(2)
    expect(getPhqScore(phqSuicidalForm2)).toBe(3)
    expect(getPhqScore(phqSuicidalForm3)).toBe(4)
    expect(getPhqScore(phqSuicidalNegativeForm)).toBe(1)
  })

  test('Check PHQ Shaded answers count', async () => {
    expect(getShadedAnswersCount(phqUnflaggedForm)).toBe(1)
    expect(getShadedAnswersCount(phqUnflaggedEdgeForm)).toBe(3)
    expect(getShadedAnswersCount(phqFlaggedEdgeForm)).toBe(4)
    expect(getShadedAnswersCount(phqFlaggedForm)).toBe(6)
  })

  test('Check PHQ Shaded Flagged state', async () => {
    expect(getPhqFlagged(phqUnflaggedForm)).toBe(false)
    expect(getPhqFlagged(phqUnflaggedEdgeForm)).toBe(false)
    expect(getPhqFlagged(phqFlaggedEdgeForm)).toBe(true)
    expect(getPhqFlagged(phqFlaggedForm)).toBe(true)
  })

  test('Check PHQ Suicidal Flagged state', async () => {
    expect(getPhqFlagged(phqSuicidalForm1)).toBe(true)
    expect(getPhqFlagged(phqSuicidalForm2)).toBe(true)
    expect(getPhqFlagged(phqSuicidalForm3)).toBe(true)
    expect(getPhqFlagged(phqSuicidalNegativeForm)).toBe(false)
  })
})

const phqUnflaggedForm = {
  PH2: {
    PH8: {
      sleep: 0,
      energy: 2,
      appetite: 1,
      self: 0,
      concentration: 0,
      slow: 0,
      suicide: 0,
      difficulty: 0,
    },
    interest: 1,
    depression: 0,
  },
}

const phqUnflaggedEdgeForm = {
  PH2: {
    PH8: {
      sleep: 2,
      energy: 2,
      appetite: 1,
      self: 0,
      concentration: 0,
      slow: 0,
      suicide: 0,
      difficulty: 0,
    },
    interest: 0,
    depression: 2,
  },
}

const phqFlaggedEdgeForm = {
  PH2: {
    PH8: {
      sleep: 2,
      energy: 2,
      appetite: 2,
      self: 0,
      concentration: 0,
      slow: 0,
      suicide: 0,
      difficulty: 0,
    },
    interest: 2,
    depression: 0,
  },
}

const phqFlaggedForm = {
  PH2: {
    PH8: {
      sleep: 2,
      energy: 2,
      appetite: 2,
      self: 3,
      concentration: 0,
      slow: 3,
      suicide: 0,
      difficulty: 0,
    },
    interest: 0,
    depression: 2,
  },
}

const phqSuicidalForm1 = {
  PH2: {
    PH8: {
      sleep: 0,
      energy: 0,
      appetite: 0,
      self: 0,
      concentration: 0,
      slow: 0,
      suicide: 1,
      difficulty: 0,
    },
    interest: 0,
    depression: 1,
  },
}

const phqSuicidalForm2 = {
  PH2: {
    PH8: {
      sleep: 0,
      energy: 0,
      appetite: 0,
      self: 0,
      concentration: 0,
      slow: 0,
      suicide: 2,
      difficulty: 0,
    },
    interest: 1,
    depression: 0,
  },
}

const phqSuicidalForm3 = {
  PH2: {
    PH8: {
      sleep: 0,
      energy: 0,
      appetite: 0,
      self: 0,
      concentration: 0,
      slow: 0,
      suicide: 3,
      difficulty: 0,
    },
    interest: 0,
    depression: 1,
  },
}

const phqSuicidalNegativeForm = {
  PH2: {
    PH8: {
      sleep: 0,
      energy: 0,
      appetite: 0,
      self: 0,
      concentration: 0,
      slow: 0,
      suicide: 0,
      difficulty: 0,
    },
    interest: 0,
    depression: 1,
  },
}
