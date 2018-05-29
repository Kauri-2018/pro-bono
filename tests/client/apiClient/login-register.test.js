import nock from 'nock'

jest.mock('../../../client/utils/localstorage', () => ({
  get: () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzMwMDAxLCJlbWFpbCI6ImFkbWluIiwicm9sZSI6ImFkbWluIiwicGVuZGluZyI6MCwicHJvZmlsZUlkIjo0NDAwMDEsImNlbnRyZUlkIjoxMTAwMDEsImZpcnN0bmFtZSI6IkthbGUiLCJsYXN0bmFtZSI6IkxpdHQiLCJwaG9uZU51bWJlciI6IjAyNzEyMzEyMyIsImNlcnRpZmljYXRlIjpudWxsLCJjb21wYW55IjpudWxsLCJpYXQiOjE1MjY0MjYzMjYsImV4cCI6MTUyNjUxMjcyNn0.wVWXAkZ3D1lOcd6O39ZtL9CtnHK8jPnNOqzX5R0yBcc'
  },
  set: () => {
    return
  }
}))

// eslint-disable-next-line import/first
import consume from '../../../client/utils/api'
// eslint-disable-next-line import/first
import {AUTH_ROUTE} from '../../../client/apiClient'

const email = 'member'
const password = 'member'
nock('http://localhost')
  .post('/api/v1/auth/login')
  .reply(200, email, password)

test('loginUser sends post request to server', () => {
  const expected = 'member'
  return consume('post', `${AUTH_ROUTE}/login`, {email, password})
    .then(res => {
      expect(res.text).toContain(expected)
    })
})

nock('http://localhost')
  .post('/api/v1/auth/register')
  .reply(200, email, password)

test('registerUsers sends post request to server', () => {
  const expected = 'member'
  return consume('post', `${AUTH_ROUTE}/register`, {email, password})
    .then(res => {
      expect(res.text).toContain(expected)
    })
})
