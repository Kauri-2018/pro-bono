exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('lawcentres').del()
    .then(() => {
      // Inserts seed entries
      return knex('lawcentres').insert([
        {
          id: 110001,
          name: 'Auckland (CBD)',
          location: 'Auckland'
        },
        {
          id: 110002,
          name: 'Auckland (Māngere)',
          location: 'Auckland'
        },
        {
          id: 110003,
          name: 'Auckland (South)',
          location: 'Auckland'
        },
        {
          id: 110004,
          name: 'Auckland (Waitematā)',
          location: 'Auckland'
        },
        {
          id: 110005,
          name: 'Auckland Disability Law',
          location: 'Auckland'
        },
        {
          id: 110006,
          name: 'Blenheim',
          location: 'Blenheim'
        },
        {
          id: 110007,
          name: 'Canterbury and West Coast',
          location: 'Canterbury and West Coast'
        },
        {
          id: 110008,
          name: 'Gisborne and Wairoa',
          location: 'Gisborne and Wairoa'
        },
        {
          id: 110009,
          name: 'Hawkes Bay',
          location: 'Hawkes Bay'
        },
        {
          id: 110010,
          name: 'Māori Land',
          location: 'Nationwide'
        },
        {
          id: 110011,
          name: 'Nelson Bays',
          location: 'Nelson Bays'
        },
        {
          id: 110012,
          name: 'Otago',
          location: 'Otago'
        },
        {
          id: 110013,
          name: 'Manawatū',
          location: 'Manawatū'
        },
        {
          id: 110014,
          name: 'Porirua',
          location: 'Porirua'
        },
        {
          id: 110015,
          name: 'Rotorua',
          location: 'Rotorua'
        },
        {
          id: 110016,
          name: 'Southland',
          location: 'Southland'
        },
        {
          id: 110017,
          name: 'Taranaki',
          location: 'Taranaki'
        },
        {
          id: 110018,
          name: 'Tauranga and Whakatāne',
          location: 'Tauranga and Whakatāne'
        },
        {
          id: 110019,
          name: 'Waikato',
          location: 'Waikato'
        },
        {
          id: 110020,
          name: 'Wairarapa',
          location: 'Wairarapa'
        },
        {
          id: 110021,
          name: 'Wellington and Hutt Valley',
          location: 'Wellington and Hutt Valley'
        },
        {
          id: 110022,
          name: 'Whanganui',
          location: 'Whanganui'
        },
        {
          id: 110023,
          name: 'Taitokerau',
          location: 'Taitokerau'
        }
      ])
    })
}
