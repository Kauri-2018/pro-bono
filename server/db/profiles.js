const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

const {makeAdmin} = require('./users')

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
    .join('users', 'profiles.user_id', '=', 'users.id')
    .where('pending', '=', true)
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
    // .join('lawcentres', 'profiles.centre_id', '=', 'lawcentres.id')
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

function markAsApproved (profileId, isAdmin, db = knex) {
  return db('profiles')
    .where('id', '=', profileId)
    .update({pending: false})
    .then(() => {
      if (isAdmin) {
        return db('profiles')
          .where('id', '=', profileId)
          .select().first()
          .then((profile) => {
            return makeAdmin(profile.user_id)
          })
      }
    })
}

function addProfile (profile, db = knex) {
  return db('profiles')
    .insert({
      'centre_id': profile.centreId || 0,
      'user_id': profile.userId,
      'firstname': profile.firstname,
      'lastname': profile.lastname,
      'phone_number': profile.phoneNumber,
      'pending': true,
      'certificate': profile.certificate || null,
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
