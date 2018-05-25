const env = require('./test-environment')
const db = require('../../../server/db/profiles')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialize(testDb)
})

afterEach(() => {
  return env.cleanup(testDb)
})

test('getLawCentresByLawyerId returns correct law centres', () => {
  const expected = [110001, 110003, 110005].sort()
  return db.getLawCentresByLawyerId(440003, testDb)
  .then(lawCentreArray => {
    lawCentreArray.sort()
    expect(JSON.stringify(lawCentreArray)).toMatch(JSON.stringify(expected))
  })
})

test('getLawCentresByLawyerId returns empty array if there are no associated law centres', () => {
  const expected = []
  return db.getLawCentresByLawyerId(440001, testDb)
  .then(lawCentreArray => {
    lawCentreArray.sort()
    expect(JSON.stringify(lawCentreArray)).toMatch(JSON.stringify(expected))
  })
})
