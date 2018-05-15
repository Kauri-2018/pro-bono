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
  makeAdmin,
  getFullUserByUserId,
  getFullUserByProfileId
}

function getPendingProfiles (db = knex) {
  return db('users')
    .join('profiles', 'users.id', '=', 'profiles.user_id')
    .where('pending', '=', true)
    .select(
      'profiles.id as profileId',
      'centre_id as centreId',
      'email',
      'role',
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

function create (email, password, role, profile, testDb) {
  const hash = crypto.getHash(password)
  const connection = testDb || knex

  return connection('users')
    .insert({
      email,
      hash: hash,
      role,
      pending: true
    })
    // updating profile table when registering
    .then(id => {
      return connection('profiles')
        .insert({
          'centre_id': profile.centreId || 0,
          'user_id': id[0],
          'firstname': profile.firstName,
          'lastname': profile.lastName,
          'phone_number': profile.phoneNumber,
          'certificate': profile.certificate || null,
          'company': profile.company || null
        })
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
    .select('id', 'email', 'role', 'pending')
    .where('id', id)
    .first()
}

function getFullUserByUserId (userId, testDb) {
  const connection = testDb || knex
  return connection('users')
    .join('profiles', 'profiles.user_id', '=', 'users.id')
    .select(
      'users.id as userId',
      'email',
      'role',
      'profiles.id as profileId',
      'centre_id as centreId',
      'firstname',
      'lastname',
      'phone_number as phoneNumber',
      'pending',
      'certificate',
      'company'
    )
    .where('userId', userId)
    .first()
}

function getFullUserByProfileId (profileId, testDb) {
  const connection = testDb || knex
  return connection('users')
    .join('profiles', 'profiles.user_id', '=', 'users.id')
    .select(
      'users.id as userId',
      'email',
      'role',
      'profiles.id as profileId',
      'centre_id as centreId',
      'firstname',
      'lastname',
      'phone_number as phoneNumber',
      'pending',
      'certificate',
      'company'
    )
    .where('profileId', profileId)
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
    .where({id: userId, role: 'member'})
    .update({role: 'admin'})
}
