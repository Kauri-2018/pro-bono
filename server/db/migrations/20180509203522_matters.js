exports.up = knex => knex.schema.createTable('matters', table => {
  table.increments('id').primary()
  table.string('category')
  table.text('details')
  table.string('contact_email')
  table.boolean('is_complete')
  table.integer('claimed_by').references('profiles.')

})

exports.down = knex => knex.schema.dropTable('matters')
