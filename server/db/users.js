const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)
const {generate} = require('../lib/crypto')

const crypto = require('../lib/crypto')

module.exports = {
  create,
  exists,
  getById,
  getByEmail,
  addUser,
  makeAdmin
}

function create (email, password, role, testDb) {
  const hash = crypto.getHash(password)
  const connection = testDb || knex

  return connection('users')
    .insert({
      email,
      hash: hash,
      role
    })
}

function exists (email, testDb) {
  const connection = testDb || knex
  return connection('users')
    .count('id as n')
    .where('email', '=', email)
    .then(count => {
      return count[0].n > 0
    })
}

function getById (id, testDb) {
  const connection = testDb || knex
  return connection('users')
    .select('id', 'email', 'role')
    .where('id', id)
    .first()
}

function getByEmail (email, testDb) {
  const connection = testDb || knex
  return connection('users')
    .select()
    .where('email', email)
    .first()
}

function addUser (email, password, role, testDb) {
  const connection = testDb || knex
  const hash = generate(password)
  return connection('users')
    .insert({
      email,
      hash,
      role
    })
}

function makeAdmin (userId, testDb) {
  const connection = testDb || knex
  return connection('users')
    .where('id', '=', userId)
    .update({role: 'admin'})
}
