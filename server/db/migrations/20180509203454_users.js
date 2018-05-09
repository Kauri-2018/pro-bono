exports.up = knex => knex.schema.createTable('users', table => {
  table.increments('id').primary()
  table.string('email')
  table.binary('hash')
  table.number('role')
})

exports.down = knex => knex.schema.dropTable('users')
