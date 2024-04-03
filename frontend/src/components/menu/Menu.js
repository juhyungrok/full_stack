import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu } from "react-icons/fi";

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  -ms-overflow-style: none; /* IE 및 Edge용 */
  scrollbar-width: none; /* Firefox 용 */
  overflow-x: auto; /* 가로 스크롤이 가능하도록 설정 */

  /* 스크롤바 숨김 */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari 및 Opera 용 */
  }
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  width: 120px;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Menu = () => {
  return (
    <Nav>
      <Link to="/">
        <Button>BEST</Button>
      </Link>
      <Link to="/category/1">
        <Button>커피</Button>
      </Link>
      <Link to="/category/2">
        <Button>라떼</Button>
      </Link>
      <Link to="/category/3">
        <Button>티</Button>
      </Link>
      <Link to="/category/4">
        <Button>주스</Button>
      </Link>
      <Link to="/category/5">
        <Button>에이드</Button>
      </Link>
    </Nav>
  );
};

export default Menu;
