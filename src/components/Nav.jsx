import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav__link active' : 'nav__link'
            }
            to='/home'
          >
            Home
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink className='nav__link' to='/search'>
            Search
          </NavLink>
        </li>
        <li className='nav__item'>
          <NavLink className='nav__link' to='/about'>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
