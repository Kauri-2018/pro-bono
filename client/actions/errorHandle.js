export const ERROR_MESSAGE = 'ERROR_MESSAGE'

export function errorHandle (errorMessage) {
  return {
    type: ERROR_MESSAGE,
    errorMessage
  }
}
