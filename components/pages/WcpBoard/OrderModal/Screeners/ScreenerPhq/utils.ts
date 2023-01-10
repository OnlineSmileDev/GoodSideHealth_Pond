import { flattenObject } from 'utils/flattenObject'
import { PhqFormValuesType } from 'components/pages/WcpBoard/OrderModal/Screeners/ScreenerPhq'

export const getPhqScore = (phqFormValues: PhqFormValuesType) => {
  const { difficulty, ...scoredPhqValues } = flattenObject(phqFormValues)
  const flattenedPHQvalues: number[] = Object.values(scoredPhqValues)
  return flattenedPHQvalues.reduce((prev, curr) => prev + curr, 0)
}

export const getShadedAnswersCount = (phqFormValues: PhqFormValuesType) => {
  // difficulty is not counted
  const { difficulty, ...scoredPhqValues } = flattenObject(phqFormValues)
  const flattenedPHQvalues: number[] = Object.values(scoredPhqValues)

  // if the result is 2 or more -> shaded blue
  return flattenedPHQvalues.reduce(
    (prev, curr) => (curr >= 2 ? ++prev : prev),
    0
  )
}

export const getPhqFlagged = (phqFormValues: PhqFormValuesType) => {
  // if there are more than 4 blue shaded questions, each blue has a value of 2 or higher
  const isNotablyShaded = getShadedAnswersCount(phqFormValues) >= 4
  // if suicidal question answered other than 0 "Not at All"
  const isSuicidalRisk = phqFormValues?.PH2?.PH8?.suicide > 0
  const shouldBeFlagged = isNotablyShaded || isSuicidalRisk
  return shouldBeFlagged
}
