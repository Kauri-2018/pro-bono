import {SHOW_PROFILE_LIST} from '../actions/profiles'

// TODO update initial state with server details when known
const initialPendingProfiles = {
id: 0,
firstname: 'goose',
lastname: 'goosssse'
}

export default function (pendingProfiles = initialPendingProfiles, action) {
  switch (action.type) {
    case SHOW_PROFILE_LIST:
      return action.pendingProfiles

    default:
      return pendingProfiles
  }
}
