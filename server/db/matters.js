const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

// const crypto = require('./crypto')

function getAllMatters (db = knex) {
  return db('matters')
    .select(
      'id as referenceNumber',
      'category',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber'
    )
}

function getIncompleteMatters (db = knex) {
  return db('matters')
    .where('is_complete', '=', false)
    .select(
      'id as referenceNumber',
      'category',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber'
    )
}

function getLiveMatters (db = knex) {
  return db('matters')
    .where({'is_complete': false, 'claimed_by': null})
    .select(
      'id as referenceNumber',
      'category',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber'
    )
}

function getMatterById (matterId, db = knex) {
  return db('matters')
    .where('id', '=', matterId)
    .select(
      'id as referenceNumber',
      'category',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber'
    )
    .first()
}

function getMatterByProfileId (profileId, db = knex) {
  return db('matters')
    .join('profiles', 'matters.claimed_by', '=', 'profiles.id')
    .where('claimed_by', '=', profileId)
    .select(
      'matters.id as referenceNumber',
      'category',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'matters.centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber'
    )
    .first()
}

function markAsComplete (matterId, db = knex) {
  return db('matters')
    .where('id', '=', matterId)
    .update({is_complete: true})
}

function markAsClaimed (matterId, profileId, db = knex) {
  return db('matters')
    .where('id', '=', matterId)
    .update({claimed_by: profileId})
}

// throw error if missing data that we need
function addNewMatter (matter, db = knex) {
  return db('matters')
    .insert({
      // 'id as referenceNumber',
      'category': matter.category,
      'details': matter.details,
      'contact_email': matter.contactEmail,
      'is_complete': false,
      'claimed_by': null,
      'centre_id': matter.centreId,
      'title': matter.title,
      'internal_matter_number': matter.internalMatterNumber
    })
}

function getLiveMattersByCategory (category, db = knex) {
  return db('matters')
    .where({'category': category, 'is_complete': false, 'claimed_by': null})
    .select(
      'id as referenceNumber',
      'category',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber'
    )
}

module.exports = {
  getAllMatters,
  getIncompleteMatters,
  markAsComplete,
  markAsClaimed,
  getMatterById,
  getLiveMattersByCategory,
  getLiveMatters,
  getMatterByProfileId,
  addNewMatter
}
