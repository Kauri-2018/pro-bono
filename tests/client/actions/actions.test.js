import {showMatterList} from '../../../client/actions/matters'

test('showMatterList returns correct action.type', () => {
  const expected = 'SHOW_MATTER_LIST'
  const actual = showMatterList()
  expect(actual.type).toBe(expected)
})

test('showMatterList returns correct action', () => {
  const expected = {
    type: 'SHOW_MATTER_LIST'
  }
  const actual = showMatterList()
  expect(actual).toEqual(expected)
})

test('showMatterList returns matterList', () => {
  const matterList = {order: 'order'}
  const expected = {
    type: 'SHOW_MATTER_LIST',
    matterList
  }
  const actual = showMatterList(matterList)
  expect(actual).toEqual(expected)
})
