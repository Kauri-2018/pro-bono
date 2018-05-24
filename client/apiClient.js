import {set} from './utils/localstorage'
import consume from './utils/api'

export const BASE_ROUTE = '/api/v1'
export const MATTER_ROUTE = BASE_ROUTE + '/matters'
export const AUTH_ROUTE = BASE_ROUTE + '/auth'
export const LAWCENTRE_ROUTE = BASE_ROUTE + '/lawcentres'
export const USER_ROUTE = BASE_ROUTE + '/users'
export const MAIL_GUN = BASE_ROUTE + '/mailgun'

// MATTER routes

export function addNewMatter (data) {
  return consume('post', `${MATTER_ROUTE}/add`, data)
}

/**
 * Gets a matter by id
 * @param {number} matterId the ID of the matter to get
 * @returns {Promise{ matter }}
 */
export function requestMatterById (matterId) {
  return consume('get', `${MATTER_ROUTE}/id/${matterId}`)
    .then(res => {
      return res.body
    })
}

export function requestLiveMatters () {
  return consume('get', `${MATTER_ROUTE}/live`)
    .then(res => res.body)
}

export function requestIncompleteMatters () {
  return consume('get', `${MATTER_ROUTE}/incomplete`)
    .then(res => res.body)
}

export function requestAllMatters () {
  return consume('get', `${MATTER_ROUTE}/`)
    .then(res => res.body)
}

export function requestMattersByProfileId (profileId) {
  return consume('get', `${MATTER_ROUTE}/profile/${profileId}`)
    .then(res => res.body)
}

export function requestIncompleteMattersByProfileId (profileId) {
  return consume('get', `${MATTER_ROUTE}/profile/${profileId}/incomplete`)
    .then(res => res.body)
}

export function requestCompleteMattersByProfileId (profileId) {
  return consume('get', `${MATTER_ROUTE}/profile/${profileId}/complete`)
    .then(res => res.body)
}

export function claimMatter (matterId, profileId) {
  return consume('put', `${MATTER_ROUTE}/claim`, {matterId, profileId})
    .then(res => res.body)
}

export function releaseMatter (matterId, profileId) {
  return consume('put', `${MATTER_ROUTE}/release`, {matterId, profileId})
    .then(res => res.body)
}

export function closeMatter (matterId) {
  return consume('put', `${MATTER_ROUTE}/`, {matterId})
    .then(res => res.body)
}

export function editMatter (matter) {
  return consume('put', `${MATTER_ROUTE}/edit`, {matter})
    .then(res => res.body)
}

// AUTH routes
export function login (email, password) {
  return consume('post', `${AUTH_ROUTE}/login`, {email, password})
    .then(res => {
      set('token', res.body.token)
    })
}

// USER routes
export function requestPendingProfiles () {
  return consume('get', `${USER_ROUTE}/pending`)
    .then(res => res.body.profiles)
}

export function approvePendingProfile (profileId, isAdmin) {
  return consume('put', `${USER_ROUTE}/approve`, {profileId, isAdmin})
    .then(res => res.body)
}

export function dispatchMailGun (data) {
  return consume('post', `${MAIL_GUN}`, data)
}

// LAWCENTRE routes
export function requestLawCentres () {
  return consume('get', `${LAWCENTRE_ROUTE}`)
    .then(res => res.body)
}

export function requestAucklandLawCentres () {
  return consume('get', `${LAWCENTRE_ROUTE}/auckland`)
    .then(res => res.body)
}

export function requestLawCentreById (lawcentreId) {
  return consume('get', `${LAWCENTRE_ROUTE}/${lawcentreId}`)
    .then(res => {
      return res.body
    })
}
