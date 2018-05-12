const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)
const {generate} = require('../lib/crypto')

const crypto = require('../lib/crypto')
const getProfileById = require('./profiles').getProfileById

module.exports = {
  getPendingProfiles,
  getApprovedProfiles,
  markAsApproved,
  create,
  exists,
  getByUserId,
  getByEmail,
  addUser,
  makeAdmin
}

function getPendingProfiles (db = knex) {
  return db('users')
    .join('profiles', 'users.id', '=', 'profiles.user_id')
    .where('users.pending', '=', true)
    .select(
      'profiles.id as profileId',
      'centre_id as centreId',
      'email',
      'user_id as userId',
      'firstname',
      'lastname',
      'phone_number as phoneNumber',
      'pending',
      'certificate',
      'company'
    )
}

function getApprovedProfiles (db = knex) {
  return db('profiles')
    .join('users', 'profiles.user_id', '=', 'users.id')
    .where('pending', '=', false)
    .select(
      'profiles.id as profileId',
      'centre_id as centreId',
      'user_id as userId',
      'role',
      'firstname',
      'lastname',
      'phone_number as phoneNumber',
      'pending',
      'certificate',
      'company'
    )
}

function markAsApproved (profileId, isAdmin, db = knex) {
  return getProfileById(profileId)
    .then(profile => {
      return db('users')
        .where({id: profile.userId, pending: true})
        .update({pending: false})
        .then(updatedId => {
          if (!updatedId) {
            throw new Error('No unapproved user with that id')
          }
          if (isAdmin) {
            return db('profiles')
              .where('id', '=', profileId)
              .select().first()
              .then((profile) => {
                return makeAdmin(profile.user_id)
              })
          }
        })
    })
}

function create (email, password, role, testDb) {
  const hash = crypto.getHash(password)
  const connection = testDb || knex

  return connection('users')
    .insert({
      email,
      hash: hash,
      role,
      pending: true
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

function getByUserId (id, testDb) {
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
