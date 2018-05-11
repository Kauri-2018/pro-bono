import {
  requestPendingProfiles
} from '../apiClient'

import errorHandle from './errorHandle'

export const SHOW_PROFILE_LIST = 'SHOW_PROFILE_LIST'

export function getPendingProfiles () {
  return dispatch => {
    return requestPendingProfiles()
      .then(pendingProfiles => {
        dispatch(showProfiles(pendingProfiles))
      })
      .catch(err => {
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

export function showProfiles (profileList) {
  return {
    type: SHOW_PROFILE_LIST,
    profileList
  }
}