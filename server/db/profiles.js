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
      'certificate',
      'company',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
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
      'certificate',
      'company',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
    .first()
}

function addProfile (profile, db = knex) {
  return db('profiles')
    .insert({
      'centre_id': profile.centreId || 0,
      'user_id': profile.userId,
      'firstname': profile.firstName,
      'lastname': profile.lastName,
      'phone_number': profile.phoneNumber,
      'certificate': profile.certificate || null,
      'company': profile.company || null,
      'work_remote': profile.workRemote || null,
      'time_commitment': profile.timeCommitment || null
    })
}

module.exports = {
  getAllProfiles,
  getProfileById,
  makeAdmin,
  addProfile
}
