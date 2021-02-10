import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../../defintions";

interface Props {
  handleLogout: () => void;
  user: User;
}

export default function SideBar({ handleLogout, user }: Props) {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  let history = useHistory();

  const handleRedirect = (location: string) => {
    history.push(location);
  };

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
        <button
          className="sidebar-options-option profile"
          onClick={() => handleRedirect("/profile")}
        >
          Profile
        </button>
        <button
          className="sidebar-options-option options"
          onClick={() => handleRedirect("/options")}
        >
          Options
        </button>
        <button
          className="sidebar-options-option logout-btn"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </section>
    </div>
  );
}
