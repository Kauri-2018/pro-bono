exports.up = knex => knex.schema.createTable('lawcentres', table => {
  table.increments('id').primary()
  table.string('name')
  table.location('location')
})

exports.down = knex => knex.schema.dropTable('lawcentres')
