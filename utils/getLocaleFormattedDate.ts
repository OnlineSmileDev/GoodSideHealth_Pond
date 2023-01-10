export const getLocaleFormattedDate = (date) =>
  date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

export const getLocaleFormattedDateSubmission = (submissionDate) =>
  new Date(submissionDate).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

export const getLocaleFormattedDateCompletion = (completionDate) => {
  const date = new Date().toLocaleDateString()
  let completionDateFormatted
  const completionDateConvertedToDateObj = new Date(completionDate)
  if (completionDateConvertedToDateObj.toLocaleDateString() === date)
    completionDateFormatted =
      completionDateConvertedToDateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
  if (completionDateConvertedToDateObj.toLocaleDateString() !== date)
    completionDateFormatted =
      completionDateConvertedToDateObj.toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'long',
        hour12: true,
      })
  return completionDateFormatted
}
