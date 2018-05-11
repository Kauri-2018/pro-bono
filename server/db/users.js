const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

const crypto = require('../lib/crypto')

module.exports = {
  create,
  exists,
  getById,
  getByName
}

function create (email, password, testDb) {
  const hash = crypto.getHash(password)
  const connection = testDb || knex

  return connection('users')
    .insert({
      email: email,
      hash: hash
    })
}

function exists (email, testDb) {
  const connection = testDb || knex
  return connection('users')
    .count('id as n')
    .where('email', email)
    .then(count => {
      return count[0].n > 0
    })
}

function getById (id, testDb) {
  const connection = testDb || knex
  return connection('users')
    .select('id', 'email')
    .where('id', id)
    .first()
}

function getByName (email, testDb) {
  const connection = testDb || knex
  return connection('users')
    .select()
    .where('email', email)
    .first()
}
