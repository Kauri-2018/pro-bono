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
import {showErrorSnackbar} from './snackbar'
import {setLoading} from './loading'

export const SHOW_MATTER_LIST = 'SHOW_MATTER_LIST'
export const SHOW_MATTER_BY_ID = 'SHOW_MATTER_BY_ID'

export function getAllMatters () {
  return dispatch => {
    dispatch(setLoading(1))
    return requestAllMatters()
      .then(allMatters => {
        dispatch(showMatterList(allMatters))
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.message))
        return Promise.reject(err.message)
      })
      .finally(() => dispatch(setLoading(-1)))
  }
}

export function getCompleteMattersByProfileId (profileId) {
  return dispatch => {
    dispatch(setLoading(1))
    return requestCompleteMattersByProfileId(profileId)
      .then(matters => {
        dispatch(showMatterList(matters))
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.message))
        return Promise.reject(err.message)
      })
      .finally(() => dispatch(setLoading(-1)))
  }
}

export function getIncompleteMattersByProfileId (profileId) {
  return dispatch => {
    dispatch(setLoading(1))
    return requestIncompleteMattersByProfileId(profileId)
      .then(matters => {
        dispatch(showMatterList(matters))
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.message))
        return Promise.reject(err.message)
      })
      .finally(() => dispatch(setLoading(-1)))
  }
}

export function getLiveMatters () {
  return dispatch => {
    dispatch(setLoading(1))
    return requestLiveMatters()
      .then(liveMatters => {
        dispatch(showMatterList(liveMatters))
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.message))
        return Promise.reject(err.message)
      })
      .finally(() => dispatch(setLoading(-1)))
  }
}

export function getIncompleteMatters () {
  return dispatch => {
    dispatch(setLoading(1))
    return requestIncompleteMatters()
      .then(incompleteMatters => {
        if (incompleteMatters) {
          dispatch(showMatterList(incompleteMatters))
        } else {
          dispatch(showMatterList([]))
        }
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.message))
        return Promise.reject(err.message)
      })
      .finally(() => dispatch(setLoading(-1)))
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
    dispatch(setLoading(1))
    return requestMatterById(id)
      .then(matterById => {
        dispatch(showMatterById(matterById))
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.message))
        return Promise.reject(err.message)
      })
      .finally(() => dispatch(setLoading(-1)))
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
