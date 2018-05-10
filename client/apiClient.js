import request from 'superagent'

export const BASE_ROUTE = '/api/v1/'
export const MATTER_ROUTE = BASE_ROUTE + 'matter/'

/**
 * Gets a matter by id
 * @param {number} matterId the is to get
 * @returns {Promise({ matter })}
 */
export function requestMatterById (matterId) {
  return request.get(`${MATTER_ROUTE}${matterId}`)
    .then(res => res.body)
}
