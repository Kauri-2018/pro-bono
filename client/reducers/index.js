import {combineReducers} from 'redux'

import auth from './auth'
import matterList from './matterList'
import matterById from './matterById'
import errorMessage from './errorHandle'
import profiles from './profiles'
import lawcentres from './lawcentres'
import snackbar from './snackbar'
import loading from './loading'

const reducers = combineReducers({
  auth,
  matterList,
  matterById,
  errorMessage,
  profiles,
  lawcentres,
  snackbar,
  loading
})

export default reducers
