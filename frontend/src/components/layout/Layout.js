// Layout.js

import React from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";

import {
  Container,
  Header,
  Logo,
  CafeName,
  Slogan,
  CartLink,
  CartIcon,
  Footer,
  CafeInfo,
  SocialLinks,
  Terms,
} from "../style/Layout";

const Layout = ({ children }) => {
  return (
    <Container>
      <Header>
        <Logo>
          <CafeName>카페명</CafeName>
          <Slogan>카페 슬로건</Slogan>
        </Logo>
        <CartLink to="/cart">
          <CartIcon />
        </CartLink>
      </Header>
      <Menu />
      <main>{children}</main>
      <Footer>
        <CafeInfo>
          <p>주소: 카페 주소</p>
          <p>전화번호: 카페 전화번호</p>
          <p>영업시간: 영업시간 정보</p>
        </CafeInfo>
        <SocialLinks>
          <a href="링크">SNS 아이콘</a>
          {/* SNS 아이콘은 원하는 SNS 아이콘 라이브러리를 사용하여 추가 */}
        </SocialLinks>
        <Terms>
          <Link to="/terms">이용약관</Link>
        </Terms>
      </Footer>
    </Container>
  );
};

export default Layout;
