const jwt = require('jsonwebtoken')
const verifyJwt = require('express-jwt')

const users = require('../db/users')

const lawyerPermissions = [
  'lawyer'
]
const memberPermissions = [
  'member',
  'admin'
]
const adminPermissions = [
  'admin'
]

function createToken (user, secret) {
  return jwt.sign({
    id: user.userId,
    email: user.email,
    role: user.role,
    pending: user.pending,
    profileId: user.profileId,
    centreId: user.centreId,
    firstname: user.firstname,
    lastname: user.lastname,
    phoneNumber: user.phoneNumber,
    certificate: user.certificate,
    company: user.company
  }, secret, {
    expiresIn: 60 * 60 * 24 // or '1d'
  })
}

function handleError (err, req, res, next) {
  if (err) {
    return res.status(403).json({
      message: 'Access to this resource was denied.',
      error: err.message
    })
  }
  next()
}

function issueJwt (req, res, next) {
  users.getByEmail(req.body.email)
    .then(user => {
      users.getFullUserByUserId(user.id)
        .then(userData => {
          const token = createToken(userData, process.env.JWT_SECRET)
          res.json({
            message: 'Authentication successful.',
            token
          })
        })
    })
    .catch(err => {
      return res.status(403).json({
        message: 'Authentication failed.',
        info: err.message
      })
    })
}

// express-jwt middleware lets us use a function as the secret
function getSecret (req, payload, done) {
  done(null, process.env.JWT_SECRET)
}

function decode (req, res, next) {
  verifyJwt({secret: getSecret})(req, res, next)
}

function isLawyer (req, res, next) {
  const user = req.user
  if (!lawyerPermissions.includes(user.role)) {
    return res.status(403).json({errorMessage: 'User not authorised'})
  }
  next()
}

function isLawyerOrAdmin (req, res, next) {
  const user = req.user
  if (!(lawyerPermissions.includes(user.role) || adminPermissions.includes(user.role))) {
    return res.status(403).json({errorMessage: 'User not authorised'})
  }
  next()
}

function isMember (req, res, next) {
  const user = req.user
  if (!memberPermissions.includes(user.role)) {
    return res.status(403).json({errorMessage: 'User not authorised'})
  }
  next()
}

function isAdmin (req, res, next) {
  const user = req.user
  if (!adminPermissions.includes(user.role)) {
    return res.status(403).json({errorMessage: 'User not authorised'})
  }
  next()
}

function securityCheck (req, res, next) {
  const user = req.user
  users.exists(req.user.email)
    .then(userExists => {
      if (!userExists) {
        return res.status(403).json({errorMessage: 'User does not exist'})
      }
      if (user.pending) {
        return res.status(403).json({errorMessage: 'User not authorised'})
      }
      next()
    })
}

module.exports = {
  handleError,
  issueJwt,
  decode,
  isLawyer,
  isMember,
  isAdmin,
  securityCheck,
  isLawyerOrAdmin
}
