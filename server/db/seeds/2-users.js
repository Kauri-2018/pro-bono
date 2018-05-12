const {getHash} = require('../../lib/crypto')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 330001,
          email: 'admin@test.co.nz',
          hash: getHash('admin'),
          role: 'admin',
          pending: true
        },
        {
          id: 330002,
          email: 'lawyerpen@test.co.nz',
          hash: getHash('lawyer'),
          role: 'lawyer',
          pending: false
        },
        {
          id: 330003,
          email: 'lawyer@test.co.nz',
          hash: getHash('lawyer'),
          role: 'lawyer',
          pending: true
        },
        {
          id: 330004,
          email: 'member@test.co.nz',
          hash: getHash('member'),
          role: 'member',
          pending: true
        }
      ])
    })
}
