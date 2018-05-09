exports.seed = (knex, Promise) => knex('users')
  .del()
  .then(() => Promise.all([
    knex('users').insert({ id: 1, username: 'aardvark', hash: Buffer.from('$argon2i$v=19$m=32768,t=4,p=1$wbzYVNa89LbWPbTtH6dYnQ$xoOnHlSOPwuFfEp61/5laRtNLp0fLJZ11aYXbYLwraA                                ') }),
    knex('users').insert({ id: 2, username: 'capybara', hash: Buffer.from('$argon2i$v=19$m=32768,t=4,p=1$+cuHWVljfFQJX0vHxxdTyA$bZO+nkLlNCdqk+OcKRK7lz0mXteAV5cqGUatXsc2vOA                                ') })
  ]))
