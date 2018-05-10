import { SHOW_MATTER_BY_ID } from "../actions/matters"

const initialMatterById = []

export default function (matterById = initialMatterById, action) {
  switch (action.type) {
    case SHOW_MATTER_BY_ID:
      return action.matterById

    default:
      return matterById
  }
}
