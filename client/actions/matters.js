import {
  requestAllMatters,
  requestMatterById
} from '../apiClient'

export const SHOW_ALL_MATTERS = 'SHOW_MATTERS'
export const SHOW_MATTERS_BY_ID = 'SHOW_MATTERS_BY_ID'

export function getallMatters () {
  return dispatch => {
    return requestAllMatters()
      .then(allMatters => {
        dispatch(showAllMatters(allMatters))
      })
  }
}

export function showAllMatters (allMatters) {
  return {
    type: SHOW_ALL_MATTERS,
    allMatters
  }
}

export function getMatterById (id) {
  return dispatch => {
    return requestMatterById(id)
      .then(matterById => {
        dispatch(showMattersById(matterById))
      })
  }
}

export function showMattersById (matterById) {
  return {
    type: SHOW_MATTERS_BY_ID,
    matterById
  }
}
