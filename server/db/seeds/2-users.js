const {getHash} = require('../../lib/crypto')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 330001,
          email: 'helloadmin@helloadmin.nz',
          hash: getHash('helloadmin'),
          role: 'admin'
        },
        {
          id: 330002,
          email: 'helloadmin@helloadmin.nz',
          hash: getHash('hellolawcentre'),
          role: 'lawyer'
        },
        {
          id: 330003,
          email: 'helloadmin@helloadmin.nz',
          hash: getHash('hellomember'),
          role: 'lawyer'
        },
        {
          id: 330004,
          email: 'helloadmin@helloadmin.nz',
          hash: getHash('hellomember'),
          role: 'member'
        }
      ])
    })
}
