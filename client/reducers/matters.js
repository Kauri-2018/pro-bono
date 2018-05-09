const initialMatters = []

export default function (matters = initialMatters, action) {
  switch (action.type) {
    case 'SHOW_MATTERS':
      return action.matters

    default:
      return matters
  }
}
