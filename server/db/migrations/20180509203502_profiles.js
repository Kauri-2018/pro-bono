exports.up = knex => knex.schema.createTable('profiles', table => {
  table.increments('id').primary()
  table.number('centre_id')
  table.number('user_id')
  table.string('firstname')
  table.string('lastname')
  table.number('phone_number')
  table.boolean('pending')
  table.string('certificate')
})

exports.down = knex => knex.schema.dropTable('profiles')
