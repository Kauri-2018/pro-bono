import { ERROR_MESSAGE } from "../actions/errorHandle"

const initialErrorMessage = []

export default function (errorMessage = initialErrorMessage, action) {
  switch (action.type) {
    case ERROR_MESSAGE:
      return action.errorMessage

    default:
      return errorMessage
  }
}
