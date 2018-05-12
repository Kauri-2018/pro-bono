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

/* {
  centreId: 0,
  certificate: '',
  company: null,
  firstname: 'example',
  lastname: 'state',
  pending: 1,
  phoneNumber: 0,
  profileId: 440001,
  userId: 0
} */
