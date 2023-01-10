import { CustomFieldTemplate } from 'components/organisms/JSONFormSchema'
import { ORDER_ACTIONS, ORDER_STATUS } from 'constants/orders'

// There are two parts to the form, PH2 and PH8 because there are 2 and 8 questions respectively
// but the 10th question does not count towards scoring, so this form is actually called PH9

const QUESTIONS = {
  1: 'Little interest or pleasure in doing things',
  2: 'Feeling down, depressed, or hopeless',
  3: 'Trouble falling or staying asleep, or sleeping too much',
  4: 'Feeling tired or having little energy',
  5: 'Poor appetite or overeating',
  6: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
  7: 'Trouble concentrating on things, such as reading the newspaper or watching television',
  8: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
  9: 'Thoughts that you would be better off dead or of hurting yourself in some way',
  10: 'If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?',
}

// question 9 is considered a critical question/is unique.
const DANGER_QUESTION_KEY = 9

const scoreMap = {
  'Not at all': 0,
  'Several days': 1,
  'More than half the days': 2,
  'Nearly every day': 3,
}

const neutralAnswers = {
  enum: ['Not at all'],
}

const triggerAnswers = {
  enum: ['Several days', 'More than half the days', 'Nearly every day'],
}

const dependencies = {
  [QUESTIONS[1]]: {
    oneOf: [
      {
        properties: {
          [QUESTIONS[1]]: neutralAnswers,
        },
      },
      {
        properties: {
          [QUESTIONS[1]]: triggerAnswers,
          PH8: { $ref: '#/definitions/PH8' },
        },
      },
    ],
  },
  [QUESTIONS[2]]: {
    oneOf: [
      {
        properties: {
          [QUESTIONS[2]]: neutralAnswers,
        },
      },
      {
        properties: {
          [QUESTIONS[2]]: triggerAnswers,
          PH8: { $ref: '#/definitions/PH8' },
        },
      },
    ],
  },
}

export const schema = {
  definitions: {
    Options: {
      type: 'number',
      enum: Object.keys(scoreMap),
    },
    PH8: {
      title: '',
      type: 'object',
      properties: {
        [QUESTIONS[3]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[4]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[5]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[6]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[7]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[8]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[9]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[10]]: {
          type: 'number',
          enum: [
            'Not difficult at all',
            'Somewhat difficult',
            'Very difficult',
            'Extremely difficult',
          ],
        },
      },
    },
  },
  type: 'object',
  properties: {
    PH2: {
      title: '',
      type: 'object',
      dependencies: dependencies,
      properties: {
        [QUESTIONS[1]]: {
          $ref: '#/definitions/Options',
        },
        [QUESTIONS[2]]: {
          $ref: '#/definitions/Options',
        },
      },
    },
  },
}

const radio = {
  'ui:widget': 'radio',
  'ui:FieldTemplate': CustomFieldTemplate,
}

export const uiSchema = {
  PH2: {
    [QUESTIONS[1]]: radio,
    [QUESTIONS[2]]: radio,
    PH8: {
      [QUESTIONS[3]]: radio,
      [QUESTIONS[4]]: radio,
      [QUESTIONS[5]]: radio,
      [QUESTIONS[6]]: radio,
      [QUESTIONS[7]]: radio,
      [QUESTIONS[8]]: radio,
      [QUESTIONS[9]]: radio,
      [QUESTIONS[10]]: radio,
    },
  },
  'ui:order': ['PH2', 'PH8'],
}

// order of results depends on order questions were answered
export const getFormResults = ({ id, action }, formData, isProvider) => {
  const PH2 = { ...formData.PH2 } //copy formData and simultaneously destructure PH2
  const { PH8 } = PH2

  delete PH2.PH8

  const PH2Questions = Object.keys(PH2)
  const results = []
  const completed_at = new Date().toISOString()
  let needPH8Scores = false
  let status = ORDER_STATUS.COMPLETE

  if (PH2Questions.length === 0) return null
  if (PH2Questions.length < 2) status = ORDER_STATUS.INCOMPLETE

  PH2Questions.forEach((question) => {
    const answer = PH2[question]
    const score_value = scoreMap[answer]

    if (score_value !== 0) needPH8Scores = true

    results.push({
      question,
      answer,
      score_value,
    })
  })

  if (needPH8Scores) {
    const PH8Questions = PH8 ? Object.keys(PH8) : []

    if (PH8Questions.length < 8) status = ORDER_STATUS.INCOMPLETE

    PH8Questions.forEach((question) => {
      const answer = PH8[question]
      const score_value = scoreMap[answer]

      results.push({
        question,
        answer,
        score_value,
      })
    })
  }

  return {
    id,
    assessmentResults: {
      // PERMISSION:- Can Complete/Declined orders
      ...(!isProvider && { status }), // API defaults no status to "Updated"
      ...(status === ORDER_STATUS.COMPLETE &&
        action === ORDER_ACTIONS.COMPLETE && { completed_at }),
      results: JSON.stringify(results),
    },
  }
}

// turn formResults back into formData
export const transformResultsIntoFormData = (results) => {
  const formData = {
    PH2: {
      PH8: {},
    },
  }

  results.forEach(({ answer, question }) => {
    const key = Number(
      Object.keys(QUESTIONS).find((key) => QUESTIONS[key] === question)
    )

    if (key) {
      if (key < 3) {
        formData.PH2[question] = answer
      } else {
        formData.PH2.PH8[question] = answer
      }
    }
  })

  return formData
}

export const prepareResultsForViewing = (results) => {
  const orderedResults = []
  let totalScore = 0

  results.forEach(({ answer, question, score_value }) => {
    totalScore += score_value ? score_value : 0

    const key = Number(
      Object.keys(QUESTIONS).find((key) => QUESTIONS[key] === question)
    )

    if (key) {
      const bgColorClass =
        key === DANGER_QUESTION_KEY
          ? score_value > 0 && 'bg-danger'
          : score_value > 1 && 'bg-primary'

      orderedResults[key - 1] = {
        question: `${key}. ${question}`,
        answer,
        bgColorClass,
      }
    }
  })

  return { results: orderedResults, totalScore }
}

export const isFormValid = (formData) => {
  const { PH2 } = formData
  const { PH8 } = PH2 || {}
  const PH2Values = Object.values(PH2 || {})
  const negativePH2Answers = PH2Values.filter((item) => item === 'Not at all')
  if (negativePH2Answers.length === 2) {
    return true
  } else {
    const PH8Values = Object.values(PH8 || {})
    if (PH8Values.length === 8) {
      return true
    } else {
      return false
    }
  }
}
