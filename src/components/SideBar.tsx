import React, { useState } from 'react'
import { User } from '../defintions';

interface Props{
    handleLogout: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    user: User
}

const LogoutBtnStyle = {
    border: '1px solid black',
    backgroundColor: 'rgba(255, 0, 0, 0.2)', 
    borderRadius: '50%', 
    width: '2.5vw', 
    height: '2.5vw',
    left: '50%',
    bottom: '0.5%', 
    transform: 'translateX(-50%)',
    color: 'red'
}

const BtnStyle = {
    left: '50%', 
    transform: 'translateX(-50%)'
}

const SidebarProfileStyle = {
    width: 'auto',
    padding: '0',
    left: '50%',
    tranform: 'translateX(-50%)'
}

const SidebarProfileImgStyle = {
    top: '6.1vh',
    transform: 'translateX(-50%)'
}

export default function SideBar({ handleLogout, user }: Props) {
    const [ collapsed, setCollapsed ] = useState<boolean>(true);

    return (
        <div className="sidebar" style={collapsed ? {width: '3vw', height: '25vh'} : {}}>
            <button 
                className='sidebar-collapse-btn' 
                onClick={()=>setCollapsed(!collapsed)} 
                style={collapsed ? BtnStyle : {}}
            >{ collapsed ? '⨠' : '←'}
            </button>
            <button className='sidebar-profile' style={collapsed ? SidebarProfileStyle : {}}>
                <img className='sidebar-profile-img' src={user.icon} style={collapsed ? SidebarProfileImgStyle : {}} alt='profile pic'/>
                <label className='sidebar-profile-label' style={collapsed ? {display: 'none'} : {}}>Profile</label>
            </button>
            <button 
                className="sidebar-logout-btn" 
                onClick={handleLogout}
                style={collapsed ? LogoutBtnStyle : {}}
            >{ collapsed ? 'X' : 'Logout' }
            </button>
        </div>
    )
}
