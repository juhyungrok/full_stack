import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const HeaderWrapper = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 93%;
  z-index: 100;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const BackButton = styled(Link)`
  margin-left: 10px;
  text-decoration: none;
  color: #000;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <BackButton to="/">
        <IoIosArrowBack size={24} />
      </BackButton>
      <HeaderTitle>장바구니</HeaderTitle>
      <div></div> {/* 중앙 정렬을 위한 공간 확보 */}
    </HeaderWrapper>
  );
};

export default Header;
