import React, {useState} from 'react';
import {FaBars, FaTimes} from "react-icons/fa";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarElements";;

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Nav>
                <Bars onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </Bars>

                <NavMenu className={isOpen ? "open" : ""}>
                    <NavLink to="/" onClick={() => setIsOpen(false)}>home</NavLink>
                    <NavLink to="/about" onClick={() => setIsOpen(false)}>about</NavLink>
                    <NavLink to="/projects" onClick={() => setIsOpen(false)}>projects</NavLink>
                    <NavLink to="/contact" onClick={() => setIsOpen(false)}>contact</NavLink>
                </NavMenu>
          </Nav>
        </>
  );
};


export default Navbar;