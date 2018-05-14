const express = require('express')

const auth = require('../lib/auth')

const db = require('../db/matters')

const router = express.Router()

router.use(express.json())
router.use(auth.decode)
router.use(auth.securityCheck)

router.get('/', auth.isAdmin, (req, res) => {
  db.getAllMatters()
    .then(matters => {
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.put('/', auth.isMember, (req, res) => {
  const matterId = req.body.matterId
  db.markAsComplete(matterId)
    .then((matterId) => {
      if (!matterId) {
        throw new Error('There was no incomplete matter with that id')
      }
    })
    .then(() => db.getIncompleteMatters())
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
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/incomplete', auth.isMember, (req, res) => {
  db.getIncompleteMatters()
    .then(matters => {
      if (!matters.length) {
        throw new Error('There are no live matters')
      }
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

// should check if matter exists, is complete and is claimed
router.put('/claim', auth.isLawyer, (req, res) => {
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

// should check if matter exists, is complete and is claimed
router.put('/release', auth.isLawyerOrAdmin, (req, res) => {
  const matterId = req.body.matterId
  db.markAsUnclaimed(matterId)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.post('/add', auth.isMember, (req, res) => {
  const matter = req.body
  db.addNewMatter(matter)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.put('/edit', auth.isMember, (req, res) => {
  const matter = req.body.matter
  db.editMatter(matter)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
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
  db.getMattersByProfileId(profileId)
    .then(matters => {
      if (!matters) {
        throw new Error('There were no matters with that profile id')
      }
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/profile/:profileId/complete', (req, res) => {
  const profileId = req.params.profileId
  db.getCompleteMattersByProfileId(profileId)
    .then(matters => {
      if (!matters) {
        throw new Error('There were no complete matters with that profile id')
      }
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/profile/:profileId/incomplete', (req, res) => {
  const profileId = req.params.profileId
  db.getIncompleteMattersByProfileId(profileId)
    .then(matters => {
      if (!matters) {
        throw new Error('There were no incomplete matters with that profile id')
      }
      res.json({matters})
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
