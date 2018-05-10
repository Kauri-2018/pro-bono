import request from 'superagent'

export const BASE_ROUTE = '/api/v1/'
export const MATTER_ROUTE = BASE_ROUTE + 'matter'

// TODO Add Auth requirements to api calls
// const token = localStorage.getItem('token')
/**
 * Gets a matter by id
 * @param {number} matterId the is to get
 * @returns {Promise({ matter })}
 */
export function requestMatterById (matterId) {
  return request.get(`${MATTER_ROUTE}/${matterId}`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .then(res => res.body)
}

export function addNewMatter (data) {
  return request.post(`${MATTER_ROUTE}/new`)
  // TODO Add Auth requirements to api calls
    // .set('Authorization', `Bearer ${token}`)
    .send(data)
}
requestMatterById(5)
