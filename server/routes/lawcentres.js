const express = require('express')

// const auth = require('../lib/auth')
const db = require('../db/lawcentres')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  db.getLawCentres()
    .then(lawcentres => {
      res.json(lawcentres)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/auckland', (req, res) => {
  db.getAucklandLawCentres()
    .then(lawcentres => {
      res.json(lawcentres)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

router.get('/:id', (req, res) => {
  const lawcentreId = req.params.id
  db.getLawCentreById(lawcentreId)
    .then(lawcentre => {
      if (!lawcentre) {
        throw new Error('There is no law centre with that id')
      }
      res.json(lawcentre)
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

module.exports = router
