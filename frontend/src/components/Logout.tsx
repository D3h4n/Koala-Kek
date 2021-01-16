import React from 'react'


export default function Logout() {
    function handleLogout(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        localStorage.clear()
        window.location.reload();
    }

    return (<div className="logout-container">
            <button onClick={handleLogout} className="logout-btn">Logout</button>
     </div>)
}
