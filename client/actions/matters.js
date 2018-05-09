import {
  requestMatters
} from '../apiClient'

export const SHOW_MATTERS = 'SHOW_MATTERS'

export function getMatters () {
  return dispatch => {
    return requestMatters()
      .then(matters => {
        dispatch(showMatters(matters))
      })
  }
}

export function showMatters (matters) {
  return {
    type: SHOW_MATTERS,
    matters
  }
}
