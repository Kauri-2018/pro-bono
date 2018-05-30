const express = require('express')

const db = require('../db/categories')

const router = express.Router()

router.use(express.json())

router.get('/', (req, res) => {
  db.getCategoriesAndSubcategories()
    .then(results => {
      const formatted = formatResults(results)
      res.json({categories: formatted})
    })
    .catch(err => {
      res.status(500).json({errorMessage: err.message})
    })
})

function formatResults (results) {
  const formatted = []
  results.forEach(result => {
    if (!formatted.some(item => item.category === result.categoryName)) {
      formatted.push({
        category: result.categoryName,
        subcategories: [result.subcategoryName]
      })
    } else {
      const existing = formatted.find(item => item.category === result.categoryName)
      existing.subcategories.push(result.subcategoryName)
    }
  })
  return formatted
}

module.exports = router
