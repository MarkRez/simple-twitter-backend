import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core';
import { Link } from "react-router-dom";
import './menuItem.scss';
const menuItem = ({ text, link, icon }) => (
  <Link to={link}>
    <li className="menu-item">
      <FontAwesomeIcon icon={icon} />{text}
    </li>
  </Link>
);


export default menuItem;
