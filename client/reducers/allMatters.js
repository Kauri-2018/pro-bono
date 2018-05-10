const initialallMatters = []

export default function (allMatters = initialallMatters, action) {
  switch (action.type) {
    case 'SHOW_MATTERS':
      return action.allMatters

    default:
      return allMatters
  }
}
