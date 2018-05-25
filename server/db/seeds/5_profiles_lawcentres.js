
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('profiles_lawcentres').del()
    .then(function () {
      // Inserts seed entries
      return knex('profiles_lawcentres').insert([
        {id: 1, profile_id: 440003, lawcentre_id: 110001},
        {id: 2, profile_id: 440003, lawcentre_id: 110003},
        {id: 3, profile_id: 440003, lawcentre_id: 110005}
      ])
    })
}
