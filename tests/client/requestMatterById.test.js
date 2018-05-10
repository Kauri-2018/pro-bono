import nock from 'nock'

import {requestMatterById, MATTER_ROUTE} from '../../client/apiClient'

const testId = 5

test('requestMatterById returns the correct matter', () => {
  nock('http://localhost')
    .get(`${MATTER_ROUTE}/${testId}`)
    .reply(200, {
      matter: {
        id: testId
      }
    })
  return requestMatterById(testId)
    .then(body => {
      expect(body.matter.id).toBe(5)
      expect(body.matter.id).not.toBe(4)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})
