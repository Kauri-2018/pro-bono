const {generate} = require('../../auth/hash')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'helloadmin@helloadmin.nz',
          hash: generate('helloadmin'),
          role: 'admin'
        },
        {
          id: 2,
          email: 'helloadmin@helloadmin.nz',
          hash: generate('hellolawcentre'),
          role: 'lawcentre'
        },
        {
          id: 3,
          email: 'helloadmin@helloadmin.nz',
          hash: generate('hellomember'),
          role: 'member'
        }
      ])
    })
}
