exports.up = knex => knex.schema.createTable('profiles', table => {
  table.increments('id').primary()
  table.integer('centre_id')
  table.integer('user_id').references('users.id')
  table.string('firstname')
  table.string('lastname')
  table.string('phone_number')
  table.boolean('pending')
  table.string('certificate')
  table.string('company')
})

exports.down = knex => knex.schema.dropTable('profiles')
