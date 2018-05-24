exports.up = knex => knex.schema.createTable('profiles_lawcentres', table => {
  table.increments('id').primary()
  table.integer('profile_id')
  table.integer('lawcentre_id')
})

exports.down = knex => knex.schema.dropTable('profiles_lawcentres')
