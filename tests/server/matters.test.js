const request = require('supertest')

// lib/auth
jest.mock('../../server/lib/auth', () => ({
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
jest.mock('../../server/db/matters', () => ({
  getAllMatters: () => Promise.resolve({
    matters: [
      {
        referenceNumber: 44,
        category: 'test category 1'
      },
      {
        referenceNumber: 45,
        category: 'test category 2'
      }
    ]
  }),
  getLiveMatters: () => Promise.resolve(
    [
      'test category 1'
    ]
  )
}))

const server = require('../../server/server')

test('GET /api/v1/matters returns allMatter', () => {
  const expected = 'test category 1'
  return request(server)
    .get('/api/v1/matters')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      expect(res.body.matters.matters[0].category).toBe(expected)
    })
})

test('GET /api/v1/matters test fails as expected', () => {
  const expected = 'test category 132123'
  return request(server)
    .get('/api/v1/matters')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      expect(res.body.matters.matters[0].category).not.toBe(expected)
    })
})

test('GET /api/v1/matters returns allMatter', () => {
  const expected = ['test category 1']
  return request(server)
    .get('/api/v1/matters/live')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      expect(res.body.matters).toEqual(expected)
    })
})

test('GET /api/v1/matters test fails as expected', () => {
  const expected = 'test category 132123'
  return request(server)
    .get('/api/v1/matters/live')
    .set('Accept', 'application/json')
    .expect(200)
    .then(res => {
      expect(res.body.matters).not.toBe(expected)
    })
})
