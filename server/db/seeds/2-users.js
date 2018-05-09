const {getHash} = require('../../lib/crypto')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'helloadmin@helloadmin.nz',
          hash: getHash('helloadmin'),
          role: 'admin'
        },
        {
          id: 2,
          email: 'helloadmin@helloadmin.nz',
          hash: getHash('hellolawcentre'),
          role: 'lawyer'
        },
        {
          id: 3,
          email: 'helloadmin@helloadmin.nz',
          hash: getHash('hellomember'),
          role: 'member'
        }
      ])
    })
}
