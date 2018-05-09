exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('lawcentres').del()
    .then(() => {
      // Inserts seed entries
      return knex('lawcentres').insert([
        {
          id: 1,
          centre_id: 1,
          user_id: 1,
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
