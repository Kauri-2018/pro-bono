const environment = process.env.NODE_ENV || 'development'
const config = require('../db/knexfile')[environment]
const knex = require('knex')(config)

const crypto = require('./crypto')

module.exports = {
  create,
  exists,
  getById,
  getByName
}

function create (username, password, connection = knex) {
  return connection('users')
    .insert({
      username: username,
      hash: hash
    })
}

function exists (username, connection = knex) {
  return connection('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getById (id, connection = knex) {
  return connection('users')
    .select('id', 'username')
    .where('id', id)
    .first()
}

function getByName (username, connection = knex) {
  return connection('users')
    .select()
    .where('username', username)
    .first()
}
