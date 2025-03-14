import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #4A4E69;
    height: 85px;
    width: 100%;
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: flex-start;
    padding: 0 20px;
    z-index: 12;
    top: 0;
    left: 0;
`;

export const NavLink = styled(Link)`
    color: #F2E9E4;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    &.active {
        color: #C9ADA7;
    }
    &:hover {
        color: #C9ADA7;
    }
`;

export const Bars = styled.div`
    display: none;
    color: #F2E9E4;

    @media screen and (max-width: 768px) {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        transform: translate(-50%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
        z-index: 13;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    position: fixed;

    @media screen and (max-width: 768px) {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh; // takes up full height of the screen
        background: #4A4E69;
        flex-direction: column; // vertical stack
        justify-content: center;
        align-items: center;
        z-index: 12;
        transform: translateY(-100%);
    
    &.open {
        transition: transform 0.3s ease-in-out;
        transform: translateY(0); // animated dropdown
        display: flex;
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-right: 24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 4px;
    background: #F2E9E4;
    padding: 10px 22px;
    color: #9A8C98;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-left: 24px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #C9ADA7;
    }
`;
