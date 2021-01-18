import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'

ReactDOM.render(
<React.StrictMode>
    <Router>
        <App />
    </Router>
    <div style={{position: 'absolute', bottom:'0', left:'10px', color:'lightgray'}}>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
</React.StrictMode>, 
document.getElementById('root'));