import React from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
        <li className="event-add-btn">
          <Link to="/event/create">Add new event</Link>
        </li>
      </ul>
    </nav>
  );
};