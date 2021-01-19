import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'

import './css/index.css'

ReactDOM.render(
<React.StrictMode>
    <Router>
        <App />
    </Router>
    <div className="credit">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</React.StrictMode>, 
document.getElementById('root'));