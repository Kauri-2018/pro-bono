exports.up = knex => knex.schema.createTable('subcategories_profiles', table => {
  table.increments('id').primary()
  table.integer('profile_id').references('profiles.id').notNullable()
  table.integer('subcategory_id').references('subcategories.id').notNullable()
})

exports.down = knex => knex.schema.dropTable('subcategories_profiles')
