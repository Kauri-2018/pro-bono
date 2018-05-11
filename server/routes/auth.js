const express = require('express')
const verifyJwt = require('express-jwt')

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
  users.getByName(req.body.email)
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
  if (!req.body.role) {
    throw new Error('Missing user role')
  }
  users.exists(req.body.email)
    .then(exists => {
      if (exists) {
        throw new Error('User already exists')
      }
      users.create(req.body.email, req.body.password, req.body.role)
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

// express-jwt middleware lets us use a function as the secret
function getSecret (req, payload, done) {
  done(null, process.env.JWT_SECRET)
}

// Protect all routes beneath this point
router.use(
  verifyJwt({
    secret: getSecret
  }),
  auth.handleError
)

// These routes are protected
router.get('/secret', (req, res) => {
  res.json({
    message: 'This is a SECRET quote.',
    user: `Your user ID is: ${req.user.id}`
  })
})

module.exports = router
