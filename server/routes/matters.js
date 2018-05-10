const express = require('express')

// const token = require('../auth/token')

const db = require('../lib/matters')

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

// router.get('/:category', (req, res) => {
//   const category = req.params.category
//   db.getMattersByCategory(category)
//     .then(matters => {
//       res.json({matters})
//     })
//     .catch(err => {
//       res.status(500).json({errorMessage: err.message})
//     })
// })

router.get('/:id', (req, res) => {
  const matterId = req.params.id
  db.getMatterById(matterId)
    .then(matter => {
      res.json({matter})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

module.exports = router
