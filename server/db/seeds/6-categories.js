exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(() => {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 660001,
          name: 'Civil'
        },
        {
          id: 660002,
          name: 'Family'
        },
        {
          id: 660003,
          name: 'Administrative'
        },
        {
          id: 660004,
          name: 'Criminal'
        },
        {
          id: 660005,
          name: 'Māori'
        }
      ])
    })
}
