import React, { useState } from "react";
import { User } from "../defintions";

interface Props {
  handleLogout: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  user: User;
}

export default function SideBar({ handleLogout, user }: Props) {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  return (
    <div className="sidebar" style={collapsed ? { height: "5.5vh" } : {}}>
      <button
        className="sidebar-collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >
        ≡
      </button>
      <div className="sidebar-user">
        <img className="sidebar-user-img" src={user.icon} alt="profile pic" />
        <h3 className="sidebar-user-display-name">{user.displayName}</h3>
      </div>

      <section
        className="sidebar-options"
        style={collapsed ? { display: "none" } : {}}
      >
        <button className="sidebar-options-option profile">Profile</button>
        <button className="sidebar-options-option options">Options</button>
        <button
          className="sidebar-options-option logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
    </div>
  );
}
