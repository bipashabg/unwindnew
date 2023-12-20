import React, { useState } from "react";
import "../../styles/navbar.css";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        Home
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">User Profile</NavLink>
        </li>
        <li>
          <NavLink to="/services">Settings</NavLink>
        </li>
        <li>
          <NavLink to="/contact">About</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;