// const domain = 'sandboxdf4879c1b10c4e79bf6d2c0beeddc065.mailgun.org'

const express = require('express')

const auth = require('../lib/auth')
const mailGunApi = require('../lib/mailgun')

const router = express.Router()

router.use(express.json())
router.use(auth.decode)
router.use(auth.securityCheck)

router.post('/', auth.isMember, (req, res) => {
  const data = req.body
  mailGunApi(data)
    .then(() => {
      res.sendStatus(200)
    })
})

module.exports = router
