import {SET_LOADING} from '../actions/loading'

const initialLoading = false

export default function (loading = initialLoading, action) {
  switch (action.type) {
    case SET_LOADING:
      return loading + action.loading

    default:
      return loading
  }
}
