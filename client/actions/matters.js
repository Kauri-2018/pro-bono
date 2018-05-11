import {
  requestAllMatters,
  requestMatterById,
  addNewMatter,
  requestLiveMatters
} from '../apiClient'

import errorHandle from './errorHandle'

export const SHOW_MATTER_LIST = 'SHOW_MATTER_LIST'
export const SHOW_MATTER_BY_ID = 'SHOW_MATTER_BY_ID'

export function getAllMatters () {
  return dispatch => {
    return requestAllMatters()
      .then(allMatters => {
        dispatch(showMatterList(allMatters))
      })
      .catch(err => {
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function getLiveMatters () {
  return dispatch => {
    return requestLiveMatters()
      .then(liveMatters => {
        dispatch(showMatterList(liveMatters))
      })
      .catch(err => {
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function showMatterList (matterList) {
  return {
    type: SHOW_MATTER_LIST,
    matterList
  }
}

export function getMatterById (id) {
  return dispatch => {
    return requestMatterById(id)
      .then(matterById => {
        dispatch(showMatterById(matterById))
      })
      .catch(err => {
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function showMatterById (matterById) {
  return {
    type: SHOW_MATTER_BY_ID,
    matterById
  }
}

// added to action so that it can be expanded upon later rather than adding straight to apiClient
export function postNewMatter (data) {
  return dispatch => {
    return addNewMatter(data)
  }
}
