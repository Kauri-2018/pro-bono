exports.up = knex => knex.schema.createTable('profiles_lawcentres', table => {
  table.increments('id').primary()
  table.integer('profile_id').references('profiles.id').notNullable()
  table.integer('lawcentre_id').references('lawcentres.id').notNullable()
})

exports.down = knex => knex.schema.dropTable('profiles_lawcentres')
