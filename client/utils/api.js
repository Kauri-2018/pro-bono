import request from 'superagent'

import {get} from './localstorage'
import {isAuthenticated} from './auth'

export default function consume (method = 'get', route, data = {}) {
  const dataMethod = method.toLowerCase() === 'get' ? 'query' : 'send'
  const token = get('token')
  const headers = {
    Accept: 'application/json'
  }

  if (isAuthenticated()) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return request[method](route)
    .set(headers)[dataMethod](data)
    .then((res) => {
      return res
    })
    .catch(err => {
      throw err
    })
}
