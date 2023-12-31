import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/">Popular</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/watchlist">Watch List</Link>
            </li>
            <li>
              <Link to="/add" className="fas fa-search">
                Search
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
