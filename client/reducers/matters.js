const initialMatters = []

export default function (matters = initialMatters, action) {
  switch (action.type) {
    case 'SHOW_USERS':
      return action.matters

    default:
      return matters
  }
}
