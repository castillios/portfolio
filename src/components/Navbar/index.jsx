import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarElements";
import './style.css';

const Navbar = () => {
  return (
      <>
          <Nav>
              <Bars />

              <NavMenu>
                  <NavLink to="/" >
                      home
                  </NavLink>
                  <NavLink to="/about" activeStyle>
                      about
                  </NavLink>
                  <NavLink to="/projects" activeStyle>
                      projects
                  </NavLink>
                  <NavLink to="/contact" activeStyle>
                      contact
                  </NavLink>
                  {/* Second Nav */}
                  {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
              </NavMenu>
          </Nav>
      </>
  );
};


export default Navbar;