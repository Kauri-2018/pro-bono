import request from '../utils/api'
import {saveUserToken} from '../utils/auth'
import {AUTH_ROUTE} from '../apiClient'
import { showErrorSnackbar } from './snackbar'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin () {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false
  }
}

export function receiveLogin (user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginError (message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser (creds) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return request('post', `${AUTH_ROUTE}/login`, creds)
      .then((res) => {
        if (!res.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(showErrorSnackbar(res.body.errorMessage))
          return Promise.reject(res.body.errorMessage)
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(res.body.token)
          // Dispatch the success action
          dispatch(receiveLogin(userInfo))
          return userInfo
        }
      })
      .catch(err => dispatch(showErrorSnackbar(err.message)))
  }
}
