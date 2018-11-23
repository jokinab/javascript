import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <nav className="menu">
        <ul className="menu-list">
          <li><Link to="/">Marvel Content</Link></li>
          <li><Link to="/characters">Marvel Characters</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    )
  }
}
