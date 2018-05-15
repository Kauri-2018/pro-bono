import {combineReducers} from 'redux'

import auth from './auth'
import matterList from './matterList'
import matterById from './matterById'
import errorMessage from './errorHandle'
import profiles from './profiles'
import snackbar from './snackbar'

const reducers = combineReducers({
  auth,
  matterList,
  matterById,
  errorMessage,
  profiles,
  snackbar
})

export default reducers
