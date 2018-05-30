const environment = process.env.NODE_ENV || 'development'
const config = require('./knexfile')[environment]
const knex = require('knex')(config)

// const crypto = require('./crypto')

function getAllMatters (db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .join('subcategories_matters', 'matters.id', '=', 'subcategories_matters.matter_id')
    .join('subcategories', 'subcategories.id', '=', 'subcategories_matters.subcategory_id')
    .select(
      'matters.id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories.name as subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
}

function getIncompleteMatters (db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .where('is_complete', '=', false)
    .select(
      'matters.id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
}

function getLiveMatters (db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .where({'is_complete': false, 'claimed_by': null})
    .select(
      'matters.id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
}

function getMatterById (matterId, db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .where('id', '=', matterId)
    .select(
      'matters.id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
    .first()
}

function getMattersByProfileId (profileId, db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .join('profiles', 'matters.claimed_by', '=', 'profiles.id')
    .where('claimed_by', '=', profileId)
    .select(
      'matters.id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'matters.centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
}

function getCompleteMattersByProfileId (profileId, db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .join('profiles', 'matters.claimed_by', '=', 'profiles.id')
    .where({claimed_by: profileId, is_complete: true})
    .select(
      'matters.id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'matters.centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
}

function getIncompleteMattersByProfileId (profileId, db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .join('profiles', 'matters.claimed_by', '=', 'profiles.id')
    .where({claimed_by: profileId, is_complete: false})
    .select(
      'matters.id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'matters.centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
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

function markAsUnclaimed (matterId, profileId, db = knex) {
  return db('matters')
    .where('id', '=', matterId)
    .update({claimed_by: null})
}

// throw error if missing data that we need
function addNewMatter (matter, db = knex) {
  return db('matters')
    .insert({
      // 'id as referenceNumber',
      // 'category_id': matter.category,
      'subcategories': matter.subcategories,
      'details': matter.details,
      'contact_email': matter.contactEmail,
      'is_complete': false,
      'claimed_by': null,
      'centre_id': matter.centreId,
      'title': matter.title,
      'internal_matter_number': matter.internalMatterNumber,
      'work_remote': matter.workRemote,
      'time_commitment': matter.timeCommitment
    })
}

function getLiveMattersByCategory (category, db = knex) {
  return db('matters')
    .join('categories', 'matters.category_id', '=', 'categories.id')
    .where({'categories.name': category, 'is_complete': false, 'claimed_by': null})
    .select(
      'id as referenceNumber',
      'categories.id as categoryId',
      'categories.name as category',
      'subcategories',
      'details',
      'contact_email as contactEmail',
      'is_complete as isComplete',
      'claimed_by as claimedBy',
      'centre_id as centreId',
      'title',
      'internal_matter_number as internalMatterNumber',
      'work_remote as workRemote',
      'time_commitment as timeCommitment'
    )
}

function editMatter (matter, db = knex) {
  return db('matters')
    .where('id', '=', matter.referenceNumber)
    .update({
      // category_id: matter.category,
      subcategories: matter.subcategories,
      details: matter.details,
      contact_email: matter.contactEmail,
      centre_id: matter.centreId,
      title: matter.title,
      internal_matter_number: matter.internalMatterNumber,
      work_remote: matter.workRemote,
      time_commitment: matter.timeCommitment
    })
}

function formatResults (results) {
  const formatted = []
  results.forEach(result => {
    if (!formatted.some(item => item.category === result.categoryName)) {
      formatted.push({
        referenceNumber: result.matters.id,
        categoryId: result.categories.id,
        category: result.categories.name,
        details: result.details,
        contactEmail: result.contact_email,
        isComplete: result.is_complete,
        claimedBy: result.claimed_by,
        centreId: result.centre_id,
        title: result.title,
        internalMatterNumber: result.internal_matter_number,
        workRemote: result.work_remote,
        
      'time_commitment as timeCommitment'
        subcategories: [result.subcategories.name]
      })
    } else {
      const existing = formatted.find(item => item.category === result.categoryName)
      existing.subcategories.push(result.subcategoryName)
    }
  })
  return formatted
}

module.exports = {
  getAllMatters,
  getIncompleteMatters,
  markAsComplete,
  markAsClaimed,
  getMatterById,
  getLiveMattersByCategory,
  getLiveMatters,
  getMattersByProfileId,
  getCompleteMattersByProfileId,
  getIncompleteMattersByProfileId,
  addNewMatter,
  markAsUnclaimed,
  editMatter
}
