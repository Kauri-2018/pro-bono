const express = require('express')

const auth = require('../lib/auth')
const exists = require('../db/users').exists

const db = require('../db/matters')

const router = express.Router()

router.use(express.json())
router.use(auth.decode)
router.use(auth.isPending)

router.get('/', auth.isAdmin, (req, res) => {
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        return db.getAllMatters()
          .then(matters => {
            res.json({matters})
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.put('/', auth.isMember, (req, res) => {
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        const matterId = req.body.matterId
        return db.markAsComplete(matterId)
          .then((matterId) => {
            if (!matterId) {
              throw new Error('There was no incomplete matter with that id')
            }
          })
          .then(() => db.getLiveMatters())
          .then(matters => {
            res.json({matters})
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/live', (req, res) => {
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        return db.getLiveMatters()
          .then(matters => {
            if (!matters.length) {
              throw new Error('There are no live matters')
            }
            res.json(matters)
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/incomplete', auth.isMember, (req, res) => {
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        return db.getIncompleteMatters()
          .then(matters => {
            if (!matters.length) {
              throw new Error('There are no live matters')
            }
            res.json(matters)
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

// should check if matter exists, is complete and is claimed
router.put('/claimed', auth.isLawyer, (req, res) => {
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        const matterId = req.body.matterId
        const profileId = req.body.profileId
        return db.markAsClaimed(matterId, profileId)
          .then(() => {
            res.sendStatus(200)
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.post('/add', auth.isMember, (req, res) => {
  const matter = req.body
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        return db.addNewMatter(matter)
          .then(() => {
            res.sendStatus(200)
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/id/:id', (req, res) => {
  const matterId = req.params.id
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        return db.getMatterById(matterId)
          .then(matter => {
            if (!matter) {
              throw new Error('There was no matter with that id')
            }
            res.json({matter})
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/profile/:profileId', (req, res) => {
  const profileId = req.params.profileId
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        return db.getMatterByProfileId(profileId)
          .then(matter => {
            if (!matter) {
              throw new Error('There was no matter with that profile id')
            }
            res.json({matter})
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/category/:category', (req, res) => {
  const category = req.params.category
  exists(req.user.email)
    .then(userExists => {
      if (userExists) {
        return db.getLiveMattersByCategory(category)
          .then(matters => {
            if (!matters.length) {
              throw new Error('There are no matters with that category')
            }
            res.json({matters})
          })
      } else {
        res.status(403).end()
      }
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

module.exports = router
