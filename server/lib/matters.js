const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const knex = require('knex')(config)

const crypto = require('./crypto')

function getAllMatters (connection = knex) {
  return connection('matters')
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

function getMatterById (matterId, connection = knex) {
  return connection('matters')
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

function getMattersByCategory (category, connection = knex) {
  return connection('matters')
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

function getInCompleteMattersByCategory (category, connection = knex) {
  return connection('matters')
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
function getInCompleteMatters (connection = knex) {
  return connection('matters')
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

function getCompleteMatters (connection = knex) {
  return connection('matters')
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

function getMattersByProfileId (profileId, connection = knex) {
  return connection('matters')
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
