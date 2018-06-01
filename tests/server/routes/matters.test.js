const request = require('supertest')

// lib/auth
jest.mock('../../../server/lib/auth', () => ({
  isAdmin: (req, res, next) => {
    next()
  },
  decode: (req, res, next) => {
    next()
  },
  issueJwt: (req, res, next) => {
    next()
  },
  securityCheck: (req, res, next) => {
    next()
  },
  isMember: (req, res, next) => {
    next()
  },
  isLawyer: (req, res, next) => {
    next()
  },
  isLawyerOrAdmin: (req, res, next) => {
    next()
  }
}))

// /db/matters
jest.mock('../../../server/db/matters', () => ({
  getAllMatters: () => Promise.resolve([
    {
      referenceNumber: 44,
      category: 'test category 1',
    subcategories: '["sub1", "sub2"]'
    },
    {
      referenceNumber: 45,
      category: 'test category 2',
      subcategories: '["sub1", "sub3"]'
    }
  ]),
  getLiveMatters: () => Promise.resolve([
    {
      referenceNumber: 44,
      category: 'test category 1',
      subcategories: '["sub1", "sub2"]',
      isComplete: false,
      claimedBy: null
    }
  ]),
  getIncompleteMatters: () => Promise.resolve([
    {
        referenceNumber: 45,
        category: 'test category 2',
        subcategories: '["sub1", "sub3"]',
        isComplete: false
    }
  ])
}))

const server = require('../../../server/server')

test('GET /api/v1/matters returns all matters', () => {
  const expected = 'test category 1'
  return request(server)
    .get('/api/v1/matters')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      expect(res.body.matters[0].category).toBe(expected)
    })
})

test('GET /api/v1/matters test fails as expected', () => {
  const expected = 'test category 132123'
  return request(server)
    .get('/api/v1/matters')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      expect(res.body.matters[0].category).not.toBe(expected)
    })
})

test('GET /api/v1/matters/live returns all live matters', () => {
  const expected = 'test category 1'
  return request(server)
    .get('/api/v1/matters/live')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const matter = res.body.matters[0]
      expect(!matter.isComplete && !matter.claimedBy).toBeTruthy()
    })
})

test('GET /api/v1/matters/incomplete gets data as expected', () => {
  const expected = ['Incomplete matter']
  return request(server)
    .get('/api/v1/matters/incomplete')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      const matter = res.body.matters[0]
      expect(matter.isComplete).toBeFalsy()
    })
})
