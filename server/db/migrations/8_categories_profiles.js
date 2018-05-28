exports.up = knex => knex.schema.createTable('categories_profiles', table => {
  table.increments('id').primary()
  table.integer('profile_id').references('profiles.id').notNullable()
  table.integer('category_id').references('categories.id').notNullable()
})

exports.down = knex => knex.schema.dropTable('categories_profiles')
