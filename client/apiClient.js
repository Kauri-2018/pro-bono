import request from 'superagent'

import {get, set} from './utils/localstorage'
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
  return request.post(`${MATTER_ROUTE}/new`)
  // TODO Add Auth requirements to api calls
    .set('Authorization', `Bearer ${get('token')}`)
    .send(data)
    .then(res => {
      if (res.status !== 200) throw new Error(res.body.errorMessage)
    })
}

export function login (email, password) {
  return request.post(`${AUTH_ROUTE}/login`)
    .send({email, password})
    .then(res => {
      if (res.status === 200) {
        set('token', res.body.token)
      }
      else throw new Error(res.body.errorMessage)
    })
}

export function register (email, password, profileData) {
  return request.post(`${AUTH_ROUTE}/register`)
    .send({email, password, profileData})
    .then(res => {
      if (res.status === 200) {
        set('token', res.body.token)
      }
      else throw new Error(res.body.errorMessage)
    })
}
