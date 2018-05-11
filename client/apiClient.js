import {set} from './utils/localstorage'
import consume from './utils/api'

export const BASE_ROUTE = '/api/v1'
export const MATTER_ROUTE = BASE_ROUTE + '/matters'
export const AUTH_ROUTE = BASE_ROUTE + '/auth'

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

export function register (email, password, profileData) {
  return consume('post', `${AUTH_ROUTE}/login`, {email, password, profileData})
    .then(res => {
      set('token', res.body.token)
    })
}
