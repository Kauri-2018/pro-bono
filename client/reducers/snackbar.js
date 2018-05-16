import {CLOSE_SNACKBAR, SHOW_SNACKBAR, SHOW_ERROR_SNACKBAR} from '../actions/snackbar'

const initialSnackbar = {
  open: false,
  message: '',
  error: false
}

export default function (snackbar = initialSnackbar, action) {
  switch (action.type) {
    case CLOSE_SNACKBAR:
      return initialSnackbar

    case SHOW_SNACKBAR:
      return {
        open: true,
        message: action.message,
        error: false
      }

    case SHOW_ERROR_SNACKBAR:
      return {
        open: true,
        message: action.message,
        error: true
      }

    default:
      return snackbar
  }
}
