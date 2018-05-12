const express = require('express')

// const token = require('../auth/token')

const db = require('../db/profiles')
const dbUsers = require('../db/users')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  db.getAllProfiles()
    .then(profiles => {
      res.json(profiles)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/:id', (req, res) => {
  const profileId = req.params.id
  db.getProfileById(profileId)
    .then(profile => {
      if (!profile) {
        throw new Error('There is no profile with that id')
      }
      res.json({profile})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

// check if user exists, if not then add user to users and add profile to profiles
// if user does exist throw new error

router.post('/add', (req, res) => {
  dbUsers.exists(req.body.email)
    .then(exists => {
      if (exists) {
        throw new Error('User exists')
      }
      const profile = req.body
      db.addProfile(profile)
        .then(() => { // next())
          res.sendStatus(200)
        })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

module.exports = router
