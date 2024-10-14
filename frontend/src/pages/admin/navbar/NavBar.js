import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  width: 200px;
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled(NavLink)`
  margin: 10px 0;
  padding: 10px;
  color: #007bff;
  text-decoration: none;
  border-radius: 4px;
  &:hover {
    background-color: #e2e6ea;
  }
  &.active {
    background-color: #e2e6ea;
  }
`;

const NavBar = () => {
  return (
    <NavContainer>
      <NavItem to="/admin">조회</NavItem>
      <NavItem to="/admin/sales-comparison">매출 비교</NavItem>
    </NavContainer>
  );
};

export default NavBar;
