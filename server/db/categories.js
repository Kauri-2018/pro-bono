const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

function getCategoriesAndSubcategories (db = knex) {
  return db('categories')
    .join('subcategories', 'categories.id', '=', 'subcategories.category_id')
    .select(
      'categories.name as categoryName',
      'subcategories.name as subcategoryName'
    )
}

module.exports = {
  getCategoriesAndSubcategories
}
