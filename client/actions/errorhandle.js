export const ERROR_MESSAGE = 'ERROR_MESSAGE'

export function errorHandle (message) {
  return {
    type: ERROR_MESSAGE,
    message
  }
}
