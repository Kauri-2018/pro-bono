const express = require('express')

const db = require('../db/users')
const mailGunApi = require('../lib/mailgun')

const router = express.Router()

router.use(express.json())

router.get('/pending', (req, res) => {
  db.getPendingProfiles()
    .then(profiles => {
      if (!profiles.length) {
        profiles = []
      }
      res.json({profiles})
    })
    .catch(err => {
      res.status(400).json({errorMessage: err.messae})
    })
})

router.get('/approved', (req, res) => {
  db.getApprovedProfiles()
    .then(profiles => {
      res.json({profiles})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.post('/add-user', (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const role = req.body.role
  db.exists(email)
    .then(exists => {
      if (exists) {
        throw new Error('User exists')
      }
      db.addUser(email, password, role)
        .then(() => { // next())
          res.sendStatus(200)
        })
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

// have not tested if this updates role to admin in users
router.put('/approve', (req, res) => {
  const profileId = req.body.profileId
  const isAdmin = req.body.isAdmin
  db.markAsApproved(profileId, isAdmin)
    .then(() => {
      res.sendStatus(200)
    })
    .then(() => {
      db.getFullUserByProfileId(profileId)
        .then(userData => {
          mailGunApi.mailGunApproveUser(userData.firstname, userData.lastname, userData.email)
        })
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  db.getById(userId)
    .then(user => {
      if (!user) {
        throw new Error('There is no user with that id')
      }
      res.json({user})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

module.exports = router
