exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('subcategories_matters').del()
    .then(function () {
      // Inserts seed entries
      return knex('subcategories_matters').insert([
        {id: 1, matter_id: 550001, subcategory_id: 770002},
        {id: 2, matter_id: 550002, subcategory_id: 770006},
        {id: 3, matter_id: 550002, subcategory_id: 770008},
        {id: 4, matter_id: 550003, subcategory_id: 770013},
        {id: 5, matter_id: 550005, subcategory_id: 770020}
      ])
    })
}
