import request from 'superagent'

export const BASE_ROUTE = '/api/v1/'
export const MATTER_ROUTE = BASE_ROUTE + 'matters'

// TODO Add Auth requirements to api calls
// const token = localStorage.getItem('token')
/**
 * Gets a matter by id
 * @param {number} matterId the is to get
 * @returns {Promise({ matter })}
 */
export function requestMatterById (matterId) {
  return request.get(`${MATTER_ROUTE}/id/${matterId}`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .then(res => res.body)
}

export function addNewMatter (data) {
  return request.post(`${MATTER_ROUTE}/add`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .send(data)
    .then(res => res.body)
}

export function requestLiveMatters () {
  return request.get(`${MATTER_ROUTE}/live`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .then(res => res.body)
}

export function requestAllMatters () {
  return request.get(`${MATTER_ROUTE}/`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .then(res => res.body)
}

export function requestPendingProfiles () {
  return request.get(`api/v1/profiles/pending`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .then(res => res.body.profiles)
}
