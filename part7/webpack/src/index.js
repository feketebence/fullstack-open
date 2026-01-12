import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'

import React from 'react' // we need this now also in the entrypoint
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
