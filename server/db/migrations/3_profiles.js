exports.up = knex => knex.schema.createTable('profiles', table => {
  table.increments('id').primary()
  table.integer('centre_id')
  table.integer('user_id').references('users.id')
  table.string('firstname')
  table.string('lastname')
  table.string('phone_number')
  table.string('certificate')
  table.string('company')
  table.boolean('work_remote')
  table.integer('time_commitment')
})

exports.down = knex => knex.schema.dropTable('profiles')
