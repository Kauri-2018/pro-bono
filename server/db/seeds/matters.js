exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('matters').del()
    .then(() => {
      // Inserts seed entries
      return knex('matters').insert([
        {
          id: 1,
          category: 1524718675000,
          details: '',
          contact_email: '',
          is_complete: false,
          claimed_by: 1,
          centre_id: 1
        },
        {
          id: 2,
          category: 1524718675000,
          details: '',
          contact_email: '',
          is_complete: false,
          claimed_by: 1,
          centre_id: 1
        }
      ])
    })
}
