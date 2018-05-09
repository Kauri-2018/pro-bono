import {combineReducers} from 'redux'

import auth from './auth'
import matters from './matters'

const reducers = combineReducers({
  auth,
  matters
})

export default reducers
