const {getHash} = require('../../lib/crypto')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 330001,
          email: 'admin',
          hash: getHash('admin'),
          role: 'admin',
          pending: false
        },
        {
          id: 330002,
          email: 'lawyerpen',
          hash: getHash('lawyer'),
          role: 'lawyer',
          pending: true
        },
        {
          id: 330003,
          email: 'lawyer',
          hash: getHash('lawyer'),
          role: 'lawyer',
          pending: false
        },
        {
          id: 330004,
          email: 'memberpen',
          hash: getHash('member'),
          role: 'member',
          pending: true
        },
        {
          id: 330005,
          email: 'member',
          hash: getHash('member'),
          role: 'member',
          pending: false
        },
        {
          id: 330006,
          email: 'adminpen',
          hash: getHash('admin'),
          role: 'member',
          pending: true
        }
      ])
    })
}
