import React from 'react'
import { useHistory } from 'react-router-dom';


export default function Logout() {
    let history = useHistory();
    function handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        localStorage.clear();
        history.push('/sign-in');
    }

    return (<div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
     </div>)
}
