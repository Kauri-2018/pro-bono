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
          role: 'admin'
        },
        {
          id: 330002,
          email: 'lawyer@test.co.nz',
          hash: getHash('lawyer'),
          role: 'lawyer'
        },
        {
          id: 330003,
          email: 'member@test.co.nz',
          hash: getHash('member'),
          role: 'member'
        }
      ])
    })
}
