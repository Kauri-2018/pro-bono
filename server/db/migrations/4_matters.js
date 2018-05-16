exports.up = knex => knex.schema.createTable('matters', table => {
  table.increments('id').primary()
  table.string('category')
  table.string('subcategories')
  table.text('details')
  table.string('contact_email')
  table.boolean('is_complete').defaultTo(false)
  table.integer('claimed_by').references('profiles.id')
  table.integer('centre_id').references('lawcentres.id')
  table.string('title')
  table.integer('internal_matter_number')
})

exports.down = knex => knex.schema.dropTable('matters')
