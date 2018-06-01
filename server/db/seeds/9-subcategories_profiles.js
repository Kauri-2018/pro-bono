exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('subcategories_profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('subcategories_profiles').insert([
        {id: 1, profile_id: 440003, subcategory_id: 770018},
        {id: 2, profile_id: 440003, subcategory_id: 770019},
        {id: 3, profile_id: 440003, subcategory_id: 770006},
        {id: 4, profile_id: 440003, subcategory_id: 770008},
        {id: 5, profile_id: 440002, subcategory_id: 770002},
        {id: 6, profile_id: 440002, subcategory_id: 770004},
        {id: 7, profile_id: 440002, subcategory_id: 770005}
      ])
    })
}
