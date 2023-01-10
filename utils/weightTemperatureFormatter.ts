export const temperatureFormatter = (temp) => {
  const formattedTemp = ((temp - 32) * (5 / 9)).toFixed(1)
  return `${temp} °F/${formattedTemp} °C`
}

export const weightFormatter = (weight) => {
  const formattedWeight = (weight / 2.205).toFixed(1)
  return `${weight} LBS/${formattedWeight} KG`
}
