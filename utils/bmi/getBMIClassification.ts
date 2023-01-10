/**
 * Modified syntax but code/core implementation was taken from
 * https://kidshealth.org/en/parents/bmi-charts.html
 * https://familysurvey.org/misc/javascript/js_apps/bmi-calculator/kh-bmicalc.js
 *  */
export const BMI_CLASS = {
  OBESE: 'Obese',
  OVERWEIGHT: 'Overweight',
  HEALTHY: 'Healthy Weight',
  UNDERWEIGHT: 'Underweight',
}

export const getBMIClassification = (percent: number) => {
  if (percent > 95) return BMI_CLASS.OBESE
  if (percent > 85) return BMI_CLASS.OVERWEIGHT
  if (percent >= 5 && percent <= 85) return BMI_CLASS.HEALTHY
  if (percent >= 0 && percent < 5) return BMI_CLASS.UNDERWEIGHT
  return '' // Error
}
