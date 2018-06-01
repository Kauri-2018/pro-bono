import {
  requestLawCentres
  // requestAucklandLawCentres
  // requestLawCentreById
} from '../apiClient'

import {errorHandle} from './errorHandle'
import {showErrorSnackbar} from './snackbar'
import {setLoading} from './loading'

export const SHOW_LAWCENTRES = 'SHOW_LAWCENTRES'
// export const SHOW_LAWCENTRE_BY_ID = 'SHOW_LAWCENTRE_BY_ID'

export function getLawCentres () {
  return dispatch => {
    dispatch(setLoading(1))
    return requestLawCentres()
      .then(allLawCentres => {
        dispatch(showLawCentres(allLawCentres))
      })
      .catch(err => {
        dispatch(showErrorSnackbar(err.message))
        return Promise.reject(err.message)
      })
      .finally(() => dispatch(setLoading(-1)))
  }
}

// export function getAucklandLawCentres () {
//   return dispatch => {
//     dispatch(setLoading(1))
//     return requestAucklandLawCentres()
//       .then(aucklandLawCentres => {
//         dispatch(showLawCentres(aucklandLawCentres))
//       })
//       .catch(err => {
//         dispatch(showErrorSnackbar(err.message))
//         return Promise.reject(err.message)
//       })
      // .finally(() => dispatch(setLoading(-1)))
//   }
// }

export function showLawCentres (lawcentres) {
  return {
    type: SHOW_LAWCENTRES,
    lawcentres
  }
}

// export function getLawCentreById (lawcentreId) {
//   return dispatch => {
//     dispatch(setLoading(1))
//     return requestLawCentreById(lawcentreId)
//       .then(lawcentre => {
//         dispatch(showLawCentreById(lawcentre))
//       })
//       .catch(err => {
//         dispatch(showErrorSnackbar(err.message))
//         return Promise.reject(err.message)
//       })
      // .finally(() => dispatch(setLoading(-1)))
//   }
// }

// export function showLawCentreById (lawcentreId) {
//   return {
//     type: SHOW_LAWCENTRE_BY_ID,
//     lawcentreId
//   }
// }
