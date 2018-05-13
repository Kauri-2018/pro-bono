import {
  requestPendingProfiles
} from '../apiClient'

import {errorHandle} from './errorHandle'

export const SHOW_PROFILE_LIST = 'SHOW_PROFILE_LIST'
export const SHOW_NO_PROFILES = 'SHOW_NO_PROFILES'

export function getPendingProfiles () {
  return dispatch => {
    return requestPendingProfiles()
      .then(pendingProfiles => {
        if (pendingProfiles.length) {
          dispatch(showProfiles(pendingProfiles))
        } else {
          dispatch(showProfiles([]))
        }
      })
      .catch(err => {
        dispatch(errorHandle(err.response.error.message))
      })
  }
}

export function showProfiles (profileList) {
  return {
    type: SHOW_PROFILE_LIST,
    profileList
  }
}
