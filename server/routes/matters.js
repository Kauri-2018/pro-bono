const express = require('express')

// const token = require('../auth/token')

const db = require('../db/matters')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  db.getAllMatters()
    .then(matters => {
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.put('/', (req, res) => {
  const matterId = req.body.matterId
  db.markAsComplete(matterId)
    .then((matterId) => {
      if (!matterId) {
        throw new Error('There was no incomplete matter with that id')
      }
    })
    .then(() => db.getLiveMatters())
    .then(matters => {
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/live', (req, res) => {
  db.getLiveMatters()
    .then(matters => {
      if (!matters.length) {
        matters = []
      }
      res.json(matters)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/incomplete', (req, res) => {
  db.getIncompleteMatters()
    .then(matters => {
      if (!matters.length) {
        throw new Error('There are no live matters')
      }
      res.json(matters)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

// should check if matter exists, is complete and is claimed
router.put('/claim', (req, res) => {
  const matterId = req.body.matterId
  const profileId = req.body.profileId
  db.markAsClaimed(matterId, profileId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.post('/add', (req, res) => {
  const matter = req.body
  db.addNewMatter(matter)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/id/:id', (req, res) => {
  const matterId = req.params.id
  db.getMatterById(matterId)
    .then(matter => {
      if (!matter) {
        throw new Error('There was no matter with that id')
      }
      res.json({matter})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/profile/:profileId', (req, res) => {
  const profileId = req.params.profileId
  db.getMatterByProfileId(profileId)
    .then(matter => {
      if (!matter) {
        throw new Error('There was no matter with that profile id')
      }
      res.json({matter})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/category/:category', (req, res) => {
  const category = req.params.category
  db.getLiveMattersByCategory(category)
    .then(matters => {
      if (!matters.length) {
        throw new Error('There are no matters with that category')
      }
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

module.exports = router
