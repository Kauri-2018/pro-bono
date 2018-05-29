const getDbConn = require('knex')

const testConfig = require('../../../server/db/knexfile').test

module.exports = {
  getTestDb: () => getDbConn(testConfig),
  initialize: (db) => {
    return db.migrate.latest()
      .then(() => {
        return db.seed.run()
      })
  },
  cleanup: (db) => {
    return db.destroy()
  }
}
