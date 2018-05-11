import { SHOW_ALL_MATTERS } from '../actions/matters'

const initialallMatters = []

export default function (allMatters = initialallMatters, action) {
  switch (action.type) {
    case SHOW_ALL_MATTERS:
      return action.allMatters

    default:
      return allMatters
  }
}
