import React from 'react'

interface Props{
    handleLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function SideBar({ handleLogout }: Props) {
    return (
        <div className="sidebar">
            <button onClick={handleLogout} className="sidebar-logout-btn">Logout</button>
        </div>
    )
}
