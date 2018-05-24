import {SHOW_LAWCENTRES} from '../actions/lawcentres'

const initialLawCentres = []

export default function (lawcentres = initialLawCentres, action) {
  switch (action.type) {
    case SHOW_LAWCENTRES:
      return action.lawcentres

    default:
      return lawcentres
  }
}
