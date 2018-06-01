import {
  requestPendingProfiles
} from '../apiClient'

import {setLoading} from './loading'
import {errorHandle} from './errorHandle'
import { showErrorSnackbar } from './snackbar'

export const SHOW_PROFILE_LIST = 'SHOW_PROFILE_LIST'
export const SHOW_NO_PROFILES = 'SHOW_NO_PROFILES'

export function getPendingProfiles () {
  return dispatch => {
    dispatch(setLoading(1))
    return requestPendingProfiles()
      .then(pendingProfiles => {
        if (pendingProfiles.length) {
          dispatch(showProfiles(pendingProfiles))
        } else {
          dispatch(showProfiles([]))
        }
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.response.error.message))
      })
      .finally(() => dispatch(setLoading(-1)))
  }
}

export function showProfiles (profileList) {
  return {
    type: SHOW_PROFILE_LIST,
    profileList
  }
}
