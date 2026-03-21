import React from "react";

const Header = ({ balance, user, toggleTheme }) => {
  return (
    <header className="navbar">
      <h2 className="logo">Budget Tracker</h2>

      <div className="nav-right">
        <div className="user-info">
          <p className="balance">₦{balance}</p>
          {user && <p className="email">{user.email}</p>}
        </div>

        <button className="theme-btn" onClick={toggleTheme}>
          Theme
        </button>
      </div>
    </header>
  );
};

export default Header;