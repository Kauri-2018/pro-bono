const express = require('express')

const auth = require('../lib/auth')

const db = require('../db/matters')

const router = express.Router()

router.use(express.json())
router.use(auth.decode)
router.use(auth.securityCheck)

router.get('/', auth.isAdmin, (req, res) => {
  db.getAllMatters()
    .then(matterList => {
      // const matters = matterList.map(matter => {
      //   const subcategories = JSON.parse(matter.subcategories)
      //   return {
      //     ...matter,
      //     subcategories
      //   }
      // })
      // res.json({matters})
      res.json({matterList})
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
    .then(matterList => {
      const matters = matterList.map(matter => {
        const subcategories = JSON.parse(matter.subcategories)
        return {
          ...matter,
          subcategories
        }
      })
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/live', (req, res) => {
  db.getLiveMatters()
    .then(matterList => {
      if (!matterList.length) {
        matterList = []
      }
      const matters = matterList.map(matter => {
        const subcategories = JSON.parse(matter.subcategories)
        return {
          ...matter,
          subcategories
        }
      })
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/incomplete', auth.isMember, (req, res) => {
  db.getIncompleteMatters()
    .then(matterList => {
      if (!matterList.length) {
        matterList = []
      }
      const matters = matterList.map(matter => {
        const subcategories = JSON.parse(matter.subcategories)
        return {
          ...matter,
          subcategories
        }
      })
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
  const newMatter = req.body
  const subcategories = JSON.stringify(newMatter.subcategories)
  const matter = {
    category: newMatter.category,
    subcategories: subcategories,
    details: newMatter.details,
    contactEmail: newMatter.contactEmail,
    centreId: newMatter.centreId,
    title: newMatter.title,
    internalMatterNumber: newMatter.internalMatterNumber,
    workRemote: newMatter.workRemote,
    timeCommitment: newMatter.timeCommitment
  }
  db.addNewMatter(matter)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.put('/edit', auth.isMember, (req, res) => {
  const editMatter = req.body.matter
  const subcategories = JSON.stringify(editMatter.subcategories)
  const matter = {
    referenceNumber: editMatter.referenceNumber,
    category: editMatter.category,
    subcategories: subcategories,
    details: editMatter.details,
    contactEmail: editMatter.contactEmail,
    centreId: editMatter.centreId,
    title: editMatter.title,
    internalMatterNumber: editMatter.internalMatterNumber,
    workRemote: editMatter.workRemote,
    timeCommitment: editMatter.timeCommitment
  }
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
    .then(matterReceived => {
      if (!matterReceived) {
        throw new Error('There was no matter with that id')
      }
      const subcategories = JSON.parse(matterReceived.subcategories)
      const matter = {
        ...matterReceived,
        subcategories
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
    .then(matterList => {
      if (!matterList) {
        throw new Error('There were no matters with that profile id')
      }
      const matters = matterList.map(matter => {
        const subcategories = JSON.parse(matter.subcategories)
        return {
          ...matter,
          subcategories
        }
      })
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/profile/:profileId/complete', (req, res) => {
  const profileId = req.params.profileId
  db.getCompleteMattersByProfileId(profileId)
    .then(matterList => {
      if (!matterList) {
        throw new Error('There were no complete matters with that profile id')
      }
      const matters = matterList.map(matter => {
        const subcategories = JSON.parse(matter.subcategories)
        return {
          ...matter,
          subcategories
        }
      })
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/profile/:profileId/incomplete', (req, res) => {
  const profileId = req.params.profileId
  db.getIncompleteMattersByProfileId(profileId)
    .then(matterList => {
      if (!matterList) {
        throw new Error('There were no incomplete matters with that profile id')
      }
      const matters = matterList.map(matter => {
        const subcategories = JSON.parse(matter.subcategories)
        return {
          ...matter,
          subcategories
        }
      })
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/category/:category', (req, res) => {
  const category = req.params.category
  db.getLiveMattersByCategory(category)
    .then(matterList => {
      if (!matterList.length) {
        throw new Error('There are no matters with that category')
      }
      const matters = matterList.map(matter => {
        const subcategories = JSON.parse(matter.subcategories)
        return {
          ...matter,
          subcategories
        }
      })
      res.json({matters})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

module.exports = router
