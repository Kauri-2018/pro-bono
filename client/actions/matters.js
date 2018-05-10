import {
  requestAllMatters,
  requestMatterById
} from '../apiClient'

import errorHandle from './errorHandle'

export const SHOW_ALL_MATTERS = 'SHOW_MATTERS'
export const SHOW_MATTER_BY_ID = 'SHOW_MATTER_BY_ID'

export function getallMatters () {
  return dispatch => {
    return requestAllMatters()
      .then(allMatters => {
        dispatch(showAllMatters(allMatters))
      })
      .catch(err => {
        dispatch(errorHandle(err.response.body.message))
        return Promise.reject(err.response.body.message)
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
        dispatch(showMatterById(matterById))
      })
      .catch(err => {
        dispatch(errorHandle(err.response.body.message))
        return Promise.reject(err.response.body.message)
      })
  }
}

export function showMatterById (matterById) {
  return {
    type: SHOW_MATTER_BY_ID,
    matterById
  }
}
