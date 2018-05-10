import {SHOW_MATTER_BY_ID} from '../actions/matters'

const initialMatterById = {
  category: '',
  details: '',
   contactEmail: '',
  isComplete: false,
  claimbedBy: 0,
  centreId: 0,
  title: '',
  internalReferenceNumber: 0
}

export default function (matterById = initialMatterById, action) {
  switch (action.type) {
    case SHOW_MATTER_BY_ID:
      return action.matterById.matter

    default:
      return matterById
  }
}
