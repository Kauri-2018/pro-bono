exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('lawcentres').del()
    .then(() => {
      // Inserts seed entries
      return knex('lawcentres').insert([
        {
          id: 110001,
          name: 'Auckland?',
          location: 'Auckland'
        }
      ])
    })
}