const initialErrorMessage = []

export default function (errorMessage = initialErrorMessage, action) {
  switch (action.type) {
    case 'SHOW_MATTERS':
      return action.errorMessage

    default:
      return errorMessage
  }
}
