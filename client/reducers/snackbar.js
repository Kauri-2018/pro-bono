import {CLOSE_SNACKBAR, SHOW_SNACKBAR} from '../actions/snackbar'

const initialSnackbar = {
  open: false,
  message: ''
}

export default function (snackbar = initialSnackbar, action) {
  switch (action.type) {
    case CLOSE_SNACKBAR:
      return initialSnackbar

    case SHOW_SNACKBAR:
      return {
        open: true,
        message: action.message
      }

    default:
      return snackbar
  }
}
