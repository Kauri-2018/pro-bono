export const SET_LOADING = 'SET_LOADING'

export function setLoading (isLoading) {
  return {
    type: SET_LOADING,
    loading: isLoading
  }
}
