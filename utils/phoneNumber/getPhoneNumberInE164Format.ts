export const getPhoneNumberInE164Format = (value) =>
  (value.length > 10 ? '+' : '+1') + value
