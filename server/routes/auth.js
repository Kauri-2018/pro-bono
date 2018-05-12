const express = require('express')

const crypto = require('../lib/crypto')
const users = require('../db/users')
const auth = require('../lib/auth')

const router = express.Router()
router.use(express.json())

router.post('/login',
  signIn,
  auth.issueJwt
)

router.post('/register',
  register,
  auth.issueJwt
)

function signIn (req, res, next) {
  users.getByEmail(req.body.email)
    .then(user => {
      return user && crypto.verifyUser(user.hash, req.body.password)
    })
    .then(isValid => {
      return isValid ? next() : invalidCredentials(res)
    })
    .catch(() => {
      res.status(400).send({
        errorType: 'DATABASE_ERROR'
      })
    })
}

function register (req, res, next) {
  const profile = req.body.profileData
  if (!req.body.role) {
    throw new Error('Missing user role')
  }
  users.exists(req.body.email)
    .then(exists => {
      if (exists) {
        throw new Error('User already exists')
      }
      users.create(req.body.email, req.body.password, req.body.role, profile)
        .then(() => next())
    })
    .catch(err => {
      res.status(400).json({errorMessage: err.message})
    })
}

function invalidCredentials (res) {
  res.status(400).send({
    errorType: 'INVALID_CREDENTIALS'
  })
}

module.exports = router
