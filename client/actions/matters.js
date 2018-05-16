import {
  requestAllMatters,
  requestMatterById,
  addNewMatter,
  requestLiveMatters,
  requestIncompleteMatters,
  requestCompleteMattersByProfileId,
  requestIncompleteMattersByProfileId
} from '../apiClient'

import {errorHandle} from './errorHandle'
import {setLoading} from './loading'

export const SHOW_MATTER_LIST = 'SHOW_MATTER_LIST'
export const SHOW_MATTER_BY_ID = 'SHOW_MATTER_BY_ID'

export function getAllMatters () {
  return dispatch => {
    dispatch(setLoading(true))
    return requestAllMatters()
      .then(allMatters => {
        dispatch(setLoading(false))
        dispatch(showMatterList(allMatters))
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function getCompleteMattersByProfileId (profileId) {
  return dispatch => {
    dispatch(setLoading(true))
    return requestCompleteMattersByProfileId(profileId)
      .then(matters => {
        dispatch(setLoading(false))
        dispatch(showMatterList(matters))
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function getIncompleteMattersByProfileId (profileId) {
  return dispatch => {
    dispatch(setLoading(true))
    return requestIncompleteMattersByProfileId(profileId)
      .then(matters => {
        dispatch(setLoading(false))
        dispatch(showMatterList(matters))
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function getLiveMatters () {
  return dispatch => {
    dispatch(setLoading(true))
    return requestLiveMatters()
      .then(liveMatters => {
        dispatch(setLoading(false))
        dispatch(showMatterList(liveMatters))
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function getIncompleteMatters () {
  return dispatch => {
    return requestIncompleteMatters()
      .then(incompleteMatters => {
        if (incompleteMatters) {
          dispatch(showMatterList(incompleteMatters))
        } else {
          dispatch(showMatterList([]))
        }
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
