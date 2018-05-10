import nock from 'nock'

import {
  requestMatterById,
  MATTER_ROUTE,
  addNewMatter
} from '../../client/apiClient'

const data = {
  category: 'civic',
  details: 'Hello world'
}

const testId = 5

nock.cleanAll()
nock('http://localhost')
  .get(`${MATTER_ROUTE}/${testId}`)
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
  .post(`${MATTER_ROUTE}/new`)
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
  .post(`${MATTER_ROUTE}/new`)
  .reply(200, {
    data
  })

test('addNewMatter expect to not equal', () => {
  return addNewMatter(data)
    .then(res => {
      expect(res.body.data.category).not.toEqual('Family Law')
    })
})
