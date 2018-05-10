import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter as Router} from 'react-router-dom'
import CssBaseline from 'material-ui/CssBaseline'
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Router>
      <Provider store={store}>
        <div>
          <CssBaseline />
          <App />
        </div>
      </Provider>
    </Router>,
    document.getElementById('app')
  )
})
