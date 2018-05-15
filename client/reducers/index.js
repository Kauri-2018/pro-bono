import {combineReducers} from 'redux'

import auth from './auth'
import matterList from './matterList'
import matterById from './matterById'
import errorMessage from './errorHandle'
import profiles from './profiles'

const reducers = combineReducers({
  auth,
  matterList,
  matterById,
  errorMessage,
  profiles
})

export default reducers
