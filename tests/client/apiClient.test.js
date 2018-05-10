import nock from 'nock'

import {requestMatterById, MATTER_ROUTE} from '../../client/apiClient'

const testId = 5

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
