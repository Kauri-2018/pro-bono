import nock from 'nock'

import {addNewMatter} from '../../client/apiClient'

const userId = {
  id: 1
}

const orderId = {
  id: 3
}

nock('http://localhost')
  .post('/api/v1/matters/new')
  .reply(200, {
    userId,
    orderId
  })

test('addNewMatter sends post request to server', () => {
  return addNewMatter(userId, orderId)
    .then(res => {
      expect(res.body.userId).toEqual(userId)
    })
})
