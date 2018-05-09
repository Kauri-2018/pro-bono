import request from 'superagent'

const MATTER_ROUTE = 'api/v1/matter/'

/**
 * Gets a matter by id
 * @param {number} matterId the is to get
 * @returns {Promise({ matter })}
 */
export function requestMatterById (matterId) {
  return request.get(`${MATTER_ROUTE}${matterId}`)
    .then(res => res.body)
}
