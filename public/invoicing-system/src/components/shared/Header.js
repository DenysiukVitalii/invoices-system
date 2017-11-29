import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
   <header>
        <h1 className="text-left">{props.title}</h1>
        <Link className="btn" to={props.link}>{props.btn}</Link>
    </header>
);

export default Header;
