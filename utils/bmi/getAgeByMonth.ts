/**
 * Modified syntax but code/core implementation was taken from
 * https://kidshealth.org/en/parents/bmi-charts.html
 * https://familysurvey.org/misc/javascript/js_apps/bmi-calculator/kh-bmicalc.js
 *  */

// For use with BMI. Age is calculated on difference in month/year and not difference in day/month/year
const getDateTimeMonth = (dateTime: string) => {
  var dateTimeArr = dateTime.split('-')
  if (dateTimeArr.length < 2) return false
  return new Date(
    dateTimeArr[0] as any,
    (dateTimeArr[1] as any) - 1,
    1,
    0,
    0,
    0
  )
}

export const getAgeByMonth = (dateOfBirth: string = '') => {
  const MS_IN_A_DAY = 86400000 // Constant for how many milliseconds are in a day
  const currDate = new Date()
  const currDateTimeMonth = new Date(
    currDate.getFullYear(),
    currDate.getMonth()
  )
  const birthdayDateTimeMonth =
    getDateTimeMonth(dateOfBirth) || currDateTimeMonth

  const ageDiff = currDateTimeMonth.getTime() - birthdayDateTimeMonth.getTime()
  return ageDiff / MS_IN_A_DAY / 365
}
