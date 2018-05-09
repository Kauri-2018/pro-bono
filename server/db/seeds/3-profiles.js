exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('profiles').del()
    .then(() => {
      // Inserts seed entries
      return knex('profiles').insert([
        {
          id: 440001,
          centre_id: 110001,
          user_id: 330001,
          firstname: 'Lionel',
          lastname: 'Hutz',
          phone_number: '027123123',
          pending: true,
          certificate: '/url/Hello-Moto/PlaceHolder',
          company: 'This is a company name'
        }
      ])
    })
}
