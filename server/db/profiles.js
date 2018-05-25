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
      'certificate',
      'company'
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
      'company': profile.company || null
    })
}

/**
 * Gets an array of the law centre ids attached to a profileId
 * @param {Number} profileId 
 * @param {*} db 
 */
function getLawCentresByLawyerId (profileId, db = knex) {
  return db('profiles_lawcentres')
    .where('profile_id', '=', profileId)
    .select('lawcentre_id as lawCentreId')
    .then(lawCentres => {
      return lawCentres.map(lawCentre => lawCentre.lawCentreId)
    })
}

module.exports = {
  getAllProfiles,
  getProfileById,
  makeAdmin,
  addProfile,
  getLawCentresByLawyerId
}
