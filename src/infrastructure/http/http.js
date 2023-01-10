import localStorage from 'localStorage'
import { API_URL_PREFIX, NO_CONTENT } from './http.constants'
import { selectJwtToken, setToken } from '../../infrastructure/userContext'
import { getStore } from '../../createStore'
import path from 'path'
// import * as actionTypes from "../userContext/userContext.actionTypes";

const ASYNC_DELAY = 2000

function get(
  url,
  config,
  { stubSuccess, stubError } = {},
  downloadFileName,
  dispatch
) {
  return doFetch(
    url,
    config,
    { stubSuccess, stubError },
    downloadFileName,
    dispatch
  )
}

function post(url, config, { stubSuccess, stubError } = {}, dispatch) {
  config = {
    ...config,
    method: 'POST',
  }

  return doFetch(url, config, { stubSuccess, stubError }, dispatch)
}

function put(url, config, { stubSuccess, stubError } = {}, dispatch) {
  config = {
    ...config,
    method: 'PUT',
  }

  return doFetch(url, config, { stubSuccess, stubError }, dispatch)
}

function patch(url, config, { stubSuccess, stubError } = {}, dispatch) {
  config = {
    ...config,
    method: 'PATCH',
  }

  return doFetch(url, config, { stubSuccess, stubError }, dispatch)
}

function callDelete(url, config, { stubSuccess, stubError } = {}, dispatch) {
  config = {
    ...config,
    method: 'DELETE',
  }

  return doFetch(url, config, { stubSuccess, stubError }, dispatch)
}

// If stubSuccess or stubError is defined then we will fake a successful call to the
// server and return stubSuccess as the response. This allows for easily
// faking calls during development when APIs aren't ready. A warning
// will be written out for each stubbed response to help prevent forgetting
// about the stubs.
function doFetch(
  url,
  config,
  { stubSuccess, stubError } = {},
  downloadFileName,
  dispatch
) {
  if (!url) {
    throw new Error('You must specify a url')
  }

  if (process.env.NODE_ENV !== 'test') {
    if (stubSuccess) {
      return new Promise((resolve) =>
        setTimeout(() => {
          console.warn(`Stubbed service call made to url: ${url}`)
          resolve(stubSuccess)
        }, ASYNC_DELAY)
      )
    }

    if (stubError) {
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          console.warn(`Stubbed service error was returned from url: ${url}`)
          reject(stubError)
        }, ASYNC_DELAY)
      )
    }
  }
  return fetch(buildUrl(url), addJwtToken(config)).then((response) => {
    if (response.headers) {
      const authHeader = response.headers.get('Authorization')

      setJwtTokenFromHeaderResponse(authHeader)
      // updateSessionToken(parseJwtTokenFromHeader(authHeader));
    }

    if (response.ok) {
      if (
        response.headers &&
        response.headers.map &&
        response.headers.map['content-type'].includes('stream')
      ) {
        return response
      } else if (response.status === NO_CONTENT) {
        return Promise.resolve('No Content')
      } else if (downloadFileName) {
        response.blob().then((myBlob) => {
          const url = window.URL.createObjectURL(myBlob)
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', downloadFileName)
          document.body.appendChild(link)
          link.click()
          // Found this solution to clean up the created code at here
          // https://gist.github.com/bierik/0baa0de30cc4ee6d3fbf8485c4d12bb8
          setTimeout(() => {
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          }, 100)
        })
        return Promise.resolve('File Downloaded')
      }
      return response.json()
    }

    const unauthorized = 401
    if (response.status === unauthorized) {
      // All else failed so redirect user ot FMS to reauthenticate
      dispatch(setToken(''))
      localStorage.removeItem('jwtToken')
      // response.json().then(() => redirectToSignOut());
    }

    return Promise.reject(response)
  })
}

function buildUrl(url) {
  return API_URL_PREFIX ? path.join(API_URL_PREFIX, url) : url
}

function addJwtToken(config) {
  const jwtToken = selectJwtToken(getStore().getState())
  if (!jwtToken || !config) {
    return config
  }

  const authorization = `Bearer ${jwtToken}`

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: authorization,
    },
  }
}

function setJwtTokenFromHeaderResponse(authorizationHeader) {
  const jwtToken = parseJwtTokenFromHeader(authorizationHeader)
  if (jwtToken) {
    localStorage.setItem('jwtToken', jwtToken)
  } else {
    localStorage.removeItem('jwtToken')
  }
}

function parseJwtTokenFromHeader(authorizationHeader) {
  if (!authorizationHeader) {
    return
  }
  const tokens = authorizationHeader.match(/\S+/g)

  // We are getting the second token because the first token will be Bearer.
  // EX: Bearer woeirweoirjw....
  return tokens.length > 1 ? tokens[1] : null
}

// const updateSessionToken = token => dispatch => {
// TODO: Do we need this?
// dispatch({
//   type: actionTypes.JWT_TOKEN_ASYNC.RECEIVED,
//   payload: token
// });
// };

const http = {
  get,
  post,
  put,
  patch,
  delete: callDelete,
}

export default http
