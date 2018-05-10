import nock from 'nock'

import {addNewMatter} from '../../client/apiClient'

const userId = {
  id: 1
}

const orderId = {
  id: 3
}

test('addNewMatter sends post request to server', () => {
  nock('http://localhost')
    .post('/api/v1/matters/new')
    .reply(200, {
      userId,
      orderId
    })

  return addNewMatter(userId, orderId)
    .then(res => {
      expect(res.body.userId).toMatchObject(userId)
    })
    .catch(err => {
      expect(err).toBeFalsy()
    })
})
