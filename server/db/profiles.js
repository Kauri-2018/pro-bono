const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

// const crypto = require('./crypto')

function getAllProfiles (db = knex) {
  return db('profiles')
    .select(
      'id as profileId',
      'centre_id as centreId',
      'user_id as userId',
      'firstname',
      'lastname',
      'phone_number as phoneNumber',
      'pending',
      'certificate',
      'company'
    )
}

function getPendingProfiles (db = knex) {
  return db('profiles')
    .where('pending', '=', true)
    .select(
      'id as profileId',
      'centre_id as centreId',
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
    .join('lawcentres', 'profiles.centre_id', '=', 'lawcentres.id')
    .where('pending', '=', true)
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

function getProfileById (profileId, db = knex) {
  return db('profiles')
    .where('id', '=', profileId)
    .select(
      'id as profileId',
      'centre_id as centreId',
      'user_id as userId',
      'firstname',
      'lastname',
      'phone_number as phoneNumber',
      'pending',
      'certificate',
      'company'
    )
    .first()
}

function markAsApproved (profileId, db = knex) {
  return db('profiles')
    .where('id', '=', profileId)
    .update({pending: false})
}

function makeAdmin (profileId, db = knex) {
  return db('users')
    .join('profiles', 'profiles.user_id', '=', 'users.id')
    .where('users.id', '=', profileId)
    .update({role: 'admin'})
}

function addProfile (profile, db = knex) {
  return db('profiles')
    .insert({
      'centre_id': profile.centreId || 0,
      // 'user_id': profile.userId, - check with Kaufee!!
      'firstname': profile.firstname,
      'lastname': profile.lastname,
      'phone_number': profile.phoneNumber,
      'pending': true,
      'certificate': null,
      'company': profile.company || null
    })
}

module.exports = {
  getAllProfiles,
  getPendingProfiles,
  getApprovedProfiles,
  getProfileById,
  markAsApproved,
  makeAdmin,
  addProfile
}
