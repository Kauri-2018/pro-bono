export const SHOW_SNACKBAR = 'SHOW_SNACKBAR'
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR'

export function showSnackbar (message, timeInMilliseconds = 5000) {
  return dispatch => {
    dispatch(displaySnackbar(message))
    setTimeout(() => dispatch(closeSnackbar()), timeInMilliseconds)
  }
}

export function displaySnackbar (message) {
  return {
    type: SHOW_SNACKBAR,
    message
  }
}

export function closeSnackbar () {
  return {
    type: CLOSE_SNACKBAR
  }
}
