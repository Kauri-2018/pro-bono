const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const knex = require('knex')(config)

const crypto = require('./crypto')

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

function getMattersByCategory (category, db = knex) {
  return db('matters')
    .where('category', '=', category)
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

function getInCompleteMattersByCategory (category, db = knex) {
  return db('matters')
    .where({'category': category, 'is_complete': false})
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

// getIncompleteMatters
function getInCompleteMatters (db = knex) {
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

function getCompleteMatters (db = knex) {
  return db('matters')
    .where('is_complete', '=', true)
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

function getMattersByProfileId (profileId, db = knex) {
  return db('matters')
    .join('profiles', 'matters.claimed_by', '=', 'profiles.id')
    .where('claimed_by', '=', profileId)
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
  getMatterById,
  getMattersByCategory,
  getInCompleteMattersByCategory,
  getCompleteMatters,
  getInCompleteMatters,
  getMattersByProfileId
}
