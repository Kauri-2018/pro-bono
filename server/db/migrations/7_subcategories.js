exports.up = knex => knex.schema.createTable('subcategories', table => {
  table.increments('id').primary()
  table.string('name')
  table.integer('category_id').references('categories.id')
})

exports.down = knex => knex.schema.dropTable('subcategories')
