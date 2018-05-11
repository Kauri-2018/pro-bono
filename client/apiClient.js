import {set} from './utils/localstorage'
import consume from './utils/api'

export const BASE_ROUTE = '/api/v1'
export const MATTER_ROUTE = BASE_ROUTE + '/matters'
export const AUTH_ROUTE = BASE_ROUTE + '/auth'
export const PROFILE_ROUTE = BASE_ROUTE + '/profiles'

/**
 * Gets a matter by id
 * @param {number} matterId the ID of the matter to get
 * @returns {Promise{ matter }}
 */
export function requestMatterById (matterId) {
  return consume('get', `${MATTER_ROUTE}/${matterId}`)
    .then(res => {
      return res.body
    })
    .catch(err => {
      throw err
    })
}

export function addNewMatter (data) {
  return consume('post', `${MATTER_ROUTE}/new`, data)
}

export function login (email, password) {
  return consume('post', `${AUTH_ROUTE}/login`, {email, password})
    .then(res => {
      set('token', res.body.token)
    })
}

export function requestLiveMatters () {
  return consume('get', `${MATTER_ROUTE}/live`)
    .then(res => res.body)
}

export function requestAllMatters () {
  return consume('get', `${MATTER_ROUTE}/`)
    .then(res => res.body)
}

export function requestPendingProfiles () {
  return request.get(`${PROFILE_ROUTE}/pending`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .then(res => res.body.profiles)
}
