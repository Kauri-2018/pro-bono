exports.up = knex => knex.schema.createTable('categories', table => {
  table.increments('id').primary()
  table.string('category_name')
})

exports.down = knex => knex.schema.dropTable('categories')
