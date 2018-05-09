const initialMatterById = []

export default function (matterById = initialMatterById, action) {
  switch (action.type) {
    case 'SHOW_MATTERS_BY_ID':
      return action.matterById

    default:
      return matterById
  }
}
