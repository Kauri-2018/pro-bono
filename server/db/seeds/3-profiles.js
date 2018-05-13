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
          firstname: 'Kale',
          lastname: 'Litt',
          phone_number: '027123123'
        },
        {
          id: 440002,
          user_id: 330002,
          firstname: 'Cam',
          lastname: 'Specter',
          phone_number: '027123123',
          certificate: '/url/Hello-Moto/PlaceHolder',
          company: 'This is a company name'
        },
        {
          id: 440003,
          user_id: 330003,
          firstname: 'Zoe',
          lastname: 'Zane',
          phone_number: '027123123',
          certificate: '/url/Hello-Moto/PlaceHolder',
          company: 'Another company name'
        },
        {
          id: 440004,
          centre_id: 110002,
          user_id: 330004,
          firstname: 'Zaeburn',
          lastname: 'Pearson',
          phone_number: '027123123'
        },
        {
          id: 440005,
          centre_id: 110001,
          user_id: 330005,
          firstname: 'Sarah',
          lastname: 'Suit',
          phone_number: '027123124'
        },
        {
          id: 440006,
          centre_id: 110001,
          user_id: 330006,
          firstname: 'Don',
          lastname: 'Smith',
          phone_number: '027123128'
        }
      ])
    })
}
