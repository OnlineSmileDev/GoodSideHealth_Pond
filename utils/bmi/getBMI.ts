/**
 * Modified syntax but code/core implementation was taken from
 * https://kidshealth.org/en/parents/bmi-charts.html
 * https://familysurvey.org/misc/javascript/js_apps/bmi-calculator/kh-bmicalc.js
 *  */

import { getHeightInInches } from '../getHeightInInches'

export const getBMI = (
  heightFt: number,
  heightInches: number,
  weight: number
) => {
  if ((!heightFt && !heightInches) || !weight) return 0

  const heightInInches = getHeightInInches(heightFt, heightInches)
  const ret =
    Math.round((weight * 703 * 10) / (heightInInches * heightInInches)) / 10

  return ret
}
