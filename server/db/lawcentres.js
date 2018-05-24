const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

function getLawCentres (db = knex) {
  return db('lawcentres')
    .select(
      'id as lawcentreId',
      'name',
      'location'
    )
}

function getAucklandLawCentres (db = knex) {
  return db('lawcentres')
    .where('location', '=', 'Auckland')
    .select(
      'id as lawcentreId',
      'name',
      'location'
    )
}

function getLawCentreById (lawcentreId, db = knex) {
  return db('lawcentres')
    .where('id', '=', lawcentreId)
    .select(
      'id as lawcentreId',
      'name',
      'location'
    )
    .first()
}

module.exports = {
  getLawCentres,
  getAucklandLawCentres,
  getLawCentreById
}
