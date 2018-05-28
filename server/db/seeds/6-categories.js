exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(() => {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 660001,
          category_name: 'Civil'
        },
        {
          id: 660002,
          category_name: 'Family'
        },
        {
          id: 660003,
          category_name: 'Administrative'
        },
        {
          id: 660004,
          category_name: 'Criminal'
        },
        {
          id: 660005,
          category_name: 'Māori'
        }
      ])
    })
}
