import React, {useState} from 'react';
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
                <Bars onClick={() => setIsOpen(!isOpen)}/>

                <NavMenu className={isOpen ? "open" : ""}>
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
                </NavMenu>
          </Nav>
        </>
  );
};


export default Navbar;