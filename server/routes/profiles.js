const express = require('express')

// const token = require('../auth/token')

const db = require('../db/profiles')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  db.getAllProfiles()
    .then(profiles => {
      res.json({profiles})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/pending', (req, res) => {
  db.getPendingProfiles()
    .then(profiles => {
      res.json({profiles})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
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

router.get('/:id', (req, res) => {
  const profileId = req.params.id
  db.getProfileById(profileId)
    .then(profile => {
      res.json({profile})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.post('/add', (req, res) => {
  const profile = req.body
  db.addProfile(profile)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.put('/', (req, res) => {
  const profileId = req.body.profileId
  // const admin = req.body.admin
  // if admin === true db(makeAdmin) & db(markAsApproved)
  // if admin === false db(markAsApproved)
  db.markAsApproved(profileId)
    .then(() => db.getPendingProfiles())
    .then(profiles => {
      res.json({profiles})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

module.exports = router
