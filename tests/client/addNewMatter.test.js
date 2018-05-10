import nock from 'nock'

import {addNewMatter} from '../../client/apiClient'

const data = {
  category: 'civic',
  details: 'Hello world'
}


nock('http://localhost')
  .post('/api/v1/matters/new')
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
  .post('/api/v1/matters/new')
  .reply(200, {
    data
  })

test('addNewMatter expect to not equal', () => {
  return addNewMatter(data)
    .then(res => {
      expect(res.body.data.category).not.toEqual('Family Law')
    })
})
