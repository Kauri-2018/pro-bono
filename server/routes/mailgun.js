// const domain = 'sandboxdf4879c1b10c4e79bf6d2c0beeddc065.mailgun.org'
const mailgun = require('mailgun.js')
const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY})

const express = require('express')

const auth = require('../lib/auth')

const router = express.Router()

router.use(express.json())
router.use(auth.decode)
router.use(auth.securityCheck)

function mailGunApi (data) {
  return mg.messages.create('sandboxdf4879c1b10c4e79bf6d2c0beeddc065.mailgun.org', {
    from: 'EDA PROBONO  <postmaster@sandboxdf4879c1b10c4e79bf6d2c0beeddc065.mailgun.org>',
    to: data.email,
    subject: data.subject,
    text: data.text,
    html: `<p>${data.text}</p>`
  })
    .then(msg => msg) 
    .catch(err => err)
}

router.post('/', auth.isMember, (req, res) => {
  const data = req.body
  mailGunApi(data)
    .then(() => { 
      res.sendStatus(200)
    })
})

module.exports = router
