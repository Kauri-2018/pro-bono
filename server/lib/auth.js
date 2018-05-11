const jwt = require('jsonwebtoken')

const users = require('../db/users')

function createToken (user, secret) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    role: user.role
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
      const token = createToken(user, process.env.JWT_SECRET)
      res.json({
        message: 'Authentication successful.',
        token
      })
    })
    .catch(err => {
      return res.status(403).json({
        message: 'Authentication failed.',
        info: err.message
      })
    })
}

module.exports = {
  handleError,
  issueJwt
}
