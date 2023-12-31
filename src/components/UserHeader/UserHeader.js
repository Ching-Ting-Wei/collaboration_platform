import React from "react";
import styled from "styled-components";
import {Link, useLocation} from "react-router-dom";
import Todo from "../TodoItem";
import { useState} from 'react';
import MessageBoard from "../MessageBoard/MessageBoard";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShrimp, faFileCirclePlus, faCommentDots } from '@fortawesome/free-solid-svg-icons'
// import { Button } from "react-bootstrap";

const HeaderContainter = styled.div`
    height: 64px;
    display: flex;
    justify-content: space-between;
    background: #686963;
	  font: inherit;
	  vertical-align: baseline;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding: 0px 32px;
`;

const Brand = styled.div`
    color: white;
    font-size: 32px;
    font-weight: bold;
`;

const NavbarList = styled.div`
    display: flex;
    align-items: end;
    justify-content: center;
`;

const Nav = styled(Link)`
    color: #fff;
    display: flex;
    justify-content: center;
    font-size: 16px;
    align-items: center;
    height: 64px;
    cursor: pointer;
    width: 100px;
    box-sizing: border-box;
    ${(props)=>
        props.$active &&
        `
        background: rgba(0,0,0,0.1)
    `}
`;

const LContainer = styled.div`
    display: flex;
    align-items: center;
    ${NavbarList}{
        margin-left: 32px;
    }
`;

const Mask = styled.div`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
`;

const Button = styled.button`
  /* padding: 10px 20px; */
  background-color: #686963;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 30px;
  border-radius: 100%;

`;

const UserPic = styled.div`
    border-radius: 50%;
    border: 1px;
    border-style: solid;
    border-color: black;
    background-color: black;
`;

// Board 
const MaskOfBoard = styled.div`
    display: ${({ $show }) => ($show ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0); 
    z-index: 999; 
    overflow-y: scroll;

    &:before {
        content: "";
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent;
        z-index: -1;
    }
`;



export default function App(){
    const location = useLocation();

    const [showMask, setShowMask] = useState(false);
    const [isBoardOpen, setOpenBoard] = useState(false);

    const toggleMask = () => {
        setShowMask(!showMask);
      };
    
    const handleCloseMask = () => {
        setShowMask(false);
    };

    const openBoard = () => {
        setOpenBoard(true);
    };
    
    const closeBoard = () => {
        setOpenBoard(false);
    };


    return(
        <>
        <HeaderContainter>
        
        <LContainer>
        <Brand>Focus Orange Tree</Brand>
        {/* 右邊的bar */}
        <NavbarList>
            <Nav to='/' $active={location.pathname === '/'}>Introduction</Nav>
            <Nav to='/userpage' $active={location.pathname === '/userpage'}>Try it</Nav>
        </NavbarList>

        </LContainer>

        {/* 左邊的bar */}
        <NavbarList>
            {/* 加功課 */}
            <Button onClick={toggleMask}> 
                <FontAwesomeIcon icon={faFileCirclePlus} /> 
            </Button>

            {/* 討論區 */}
            <Button onClick={openBoard}> 
                <FontAwesomeIcon icon={faCommentDots} /> 
            </Button>
            <MaskOfBoard $show={isBoardOpen} onClick={closeBoard}>
                <MessageBoard isBoardOpen={isBoardOpen} closeBoard={closeBoard} setOpenBoard ={setOpenBoard}></MessageBoard>
            </MaskOfBoard>


            {/* 使用者圖示 */}
            <UserPic>
                <Button> <FontAwesomeIcon icon={faShrimp} /> </Button>
            </UserPic>
            
            {/* 加功課的背景遮罩 */}
            <Mask $show={showMask}>
                <Todo handleCloseMask={handleCloseMask}></Todo>
            </Mask>

            {/* <Nav to='/grouppage' $active={location.pathname === '/grouppage'}>add hw</Nav> */}
        </NavbarList>
        </HeaderContainter>
        </>
    );
}