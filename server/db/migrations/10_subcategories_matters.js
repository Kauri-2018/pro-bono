exports.up = knex => knex.schema.createTable('subcategories_matters', table => {
  table.increments('id').primary()
  table.integer('matter_id').references('matters.id').notNullable()
  table.integer('subcategory_id').references('subcategories.id').notNullable()
})

exports.down = knex => knex.schema.dropTable('subcategories_matters')
