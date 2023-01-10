export const downloadImage = async (url, name) => {
  fetch(url, {
    method: 'GET',
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', name)
        document.body.appendChild(link)
        link.click()
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getInitialsFollowedBySurname = (name) => {
  const nameArray = name.split(' ')
  //Note: last element of nameArray returns as it is and for other elements, it returns the first letter in upper case.
  const formattedName = nameArray
    .map((each, index) =>
      index !== nameArray.length - 1 ? each.charAt(0).toUpperCase() : each
    )
    .join('.')
  return formattedName
}
