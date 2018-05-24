import {SHOW_PROFILE_LIST} from '../actions/profiles'

// TODO update initial state with server details when known
const initialProfileList = []

export default function (profileList = initialProfileList, action) {
  switch (action.type) {
    case SHOW_PROFILE_LIST:
      return action.profileList

    default:
      return profileList
  }
}
