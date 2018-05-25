import {
  requestLawCentres
  // requestAucklandLawCentres
  // requestLawCentreById
} from '../apiClient'

import {errorHandle} from './errorHandle'
import {setLoading} from './loading'

export const SHOW_LAWCENTRES = 'SHOW_LAWCENTRES'
// export const SHOW_LAWCENTRE_BY_ID = 'SHOW_LAWCENTRE_BY_ID'

export function getLawCentres () {
  return dispatch => {
    dispatch(setLoading(true))
    return requestLawCentres()
      .then(allLawCentres => {
        dispatch(setLoading(false))
        dispatch(showLawCentres(allLawCentres))
      })
      .catch(err => {
        dispatch(setLoading(false))
        dispatch(errorHandle(err.message))
        return Promise.reject(err.message)
      })
  }
}

// export function getAucklandLawCentres () {
//   return dispatch => {
//     dispatch(setLoading(true))
//     return requestAucklandLawCentres()
//       .then(aucklandLawCentres => {
//         dispatch(setLoading(false))
//         dispatch(showLawCentres(aucklandLawCentres))
//       })
//       .catch(err => {
//         dispatch(setLoading(false))
//         dispatch(errorHandle(err.message))
//         return Promise.reject(err.message)
//       })
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
//     dispatch(setLoading(true))
//     return requestLawCentreById(lawcentreId)
//       .then(lawcentre => {
//         dispatch(setLoading(false))
//         dispatch(showLawCentreById(lawcentre))
//       })
//       .catch(err => {
//         dispatch(setLoading(false))
//         dispatch(errorHandle(err.message))
//         return Promise.reject(err.message)
//       })
//   }
// }

// export function showLawCentreById (lawcentreId) {
//   return {
//     type: SHOW_LAWCENTRE_BY_ID,
//     lawcentreId
//   }
// }
