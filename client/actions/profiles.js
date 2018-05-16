import {
  requestPendingProfiles
} from '../apiClient'

import {setLoading} from './loading'
import {errorHandle} from './errorHandle'

export const SHOW_PROFILE_LIST = 'SHOW_PROFILE_LIST'
export const SHOW_NO_PROFILES = 'SHOW_NO_PROFILES'

export function getPendingProfiles () {
  return dispatch => {
    dispatch(setLoading(true))
    return requestPendingProfiles()
      .then(pendingProfiles => {
        dispatch(setLoading(false))
        if (pendingProfiles.length) {
          dispatch(showProfiles(pendingProfiles))
        } else {
          dispatch(showProfiles([]))
        }
      })
      .catch(err => {
        dispatch(setLoading(false))
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
