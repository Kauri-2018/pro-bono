import nock from 'nock'

import {login} from '../../client/apiClient'

const userDetails = {
  message: 'Authentication successful.',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJkb24iLCJpYXQiOjE1MjU2NjQ4NTgsImV4cCI6MTUyNTc1MTI1OH0.ofOMvjwHAEkbAnMK7NC2xG3RneUlGGeTE52OC-Di06w'
}

nock('http://localhost')
  .post('/api/v1/auth/login')
  .reply(200, userDetails)

test('loginUser sends post request to server', () => {
  const expected = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJkb24iLCJpYXQiOjE1MjU2NjQ4NTgsImV4cCI6MTUyNTc1MTI1OH0.ofOMvjwHAEkbAnMK7NC2xG3RneUlGGeTE52OC-Di06w'
  return login(userDetails)
    .then(res => {
      expect(res.text).toContain(expected)
    })
})
