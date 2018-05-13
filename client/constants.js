import { withStyles } from 'material-ui/styles'

export const listStyles = (theme) => {
  return {
    root: {
    display: 'flex',
      flexWrap: 'wrap'
    },
    margin: {
      margin: theme.spacing.unit
    },
    textField: {
      flexBasis: 200
    }}
}