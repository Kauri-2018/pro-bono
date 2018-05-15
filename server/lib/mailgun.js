var apiKey = process.env.MAILGUN_API_KEY
var OUR_EMAIL = 'edaprobono@gmail.com'
const OUR_DOMAIN = 'probono.rgs.nz'
const mg = require('mailgun-js')({apiKey, domain: OUR_DOMAIN})

const APPROVE_SUBJECT = 'Your application has been approved'

function mailGunApproveUser (firstname, lastname, email) {
  const text = `${lastname}, ${firstname} thanks!`
  const data = {
    emails: [email],
    subject: APPROVE_SUBJECT,
    text
  }
  mailGunApi(data)
}

function mailGunApi (data) {
  return mg.messages()
    .send({
      from: `EDA PROBONO <${OUR_EMAIL}>`,
      to: [...data.emails, OUR_EMAIL],
      subject: data.subject,
      text: data.text,
      html: `<p>${data.text}</p>`
    }, (err, body) => {
      if (err) console.error('err: ' + err)
      if (body) console.log('msg: ' + body.msg)
    })
}

module.exports = {
  mailGunApi,
  mailGunApproveUser
}
