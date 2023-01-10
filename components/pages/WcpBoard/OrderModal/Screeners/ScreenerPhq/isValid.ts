export const isFormValid = (formData) => {
  const { PH2 } = formData
  const { PH8 } = PH2 || {}
  const PH2Values = Object.values(PH2 || {})

  // 0 - negative PHQ answer
  const negativePH2Answers = PH2Values.filter((item) => item === 0)

  // PH2 negative answers not triggering PH8 to render
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
