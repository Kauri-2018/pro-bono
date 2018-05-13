import request from '../utils/api'
import {receiveLogin} from './login'
import {saveUserToken} from '../utils/auth'
import {AUTH_ROUTE} from '../apiClient'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

function requestRegister (creds) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function registerError (message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function registerUser (email, password, role, profileData) {
  return dispatch => {
    // We dispatch requestRegister to kickoff the call to the API
    dispatch(requestRegister({email, password, role}))

    return request('post', `${AUTH_ROUTE}/register`, {email, password, role, profileData})
      .then((res) => {
        if (!res.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError(res.body.message))
          return Promise.reject(res.body.message)
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(res.body.token)
          // Dispatch the success action
          dispatch(receiveLogin(userInfo))
          return userInfo
        }
      }).catch(err => {
        dispatch(registerError(err.message))
      })
  }
}