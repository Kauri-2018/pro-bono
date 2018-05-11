import { SHOW_MATTER_LIST } from "../actions/matters"

const initialMatterList = []

export default function matterList (matterList = initialMatterList, action) {
  switch (action.type) {
    case SHOW_MATTER_LIST:
      return action.matterList

    default:
      return matterList
  }
}
