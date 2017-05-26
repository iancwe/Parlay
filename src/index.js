import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/App'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

// var config={
//   apikey:process.env.REACT_APP_footballAPI
// }

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
