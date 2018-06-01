exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories_profiles').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories_profiles').insert([
        {id: 1, profile_id: 440003, category_id: 660002},
        {id: 2, profile_id: 440003, category_id: 660004},
        {id: 3, profile_id: 440002, category_id: 660001}
      ])
    })
}
