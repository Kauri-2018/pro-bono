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
import {
  requestMatterById,
  MATTER_ROUTE,
  addNewMatter
} from '../../../client/apiClient'

const data = {
  category: 'civic',
  details: 'Hello world'
}

const testId = 5

nock.cleanAll()

nock('http://localhost')
  .get(`${MATTER_ROUTE}/id/${testId}`)
  .reply(200, {
    matter: {
      id: testId
    }
  })

test('requestMatterById returns the correct matter', () => {
  return requestMatterById(testId)
    .then(body => {
      expect(body.matter.id).toBe(5)
      expect(body.matter.id).not.toBe(4)
    })
})

nock('http://localhost')
  .post(`${MATTER_ROUTE}/add`)
  .reply(200, {
    data
  })

test('addNewMatter sends post request to server', () => {
  return addNewMatter(data)
    .then(res => {
      expect(res.body.data.category).toEqual(data.category)
    })
})

nock('http://localhost')
  .post(`${MATTER_ROUTE}/add`)
  .reply(200, {
    data
  })

test('addNewMatter expect to not equal', () => {
  return addNewMatter(data)
    .then(res => {
      expect(res.body.data.category).not.toEqual('Family Law')
    })
})
