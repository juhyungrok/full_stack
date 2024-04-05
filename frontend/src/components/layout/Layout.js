// Layout.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../menu/Menu";

import * as styled from "./LayoutStyles";

import Accessmodal from "../modal/Accessmodal";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // 장바구니 정보 확인(모달창)
  const checkCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    if (!cartItems || cartItems.length === 0) {
      setShowModal(true); // 모달 표시
    } else {
      navigate("/cart"); // 장바구니 페이지로 이동
    }
  };
  return (
    <styled.Container>
      <styled.Header>
        <styled.Logo>
          <styled.CafeName>카페명</styled.CafeName>
          <styled.Slogan>카페 슬로건</styled.Slogan>
        </styled.Logo>
        <styled.CartLink onClick={checkCart}>
          <styled.CartIcon />
        </styled.CartLink>
      </styled.Header>
      <Menu />
      <main>{children}</main>
      <styled.Footer>
        <styled.CafeInfo>
          <p>주소: 카페 주소</p>
          <p>전화번호: 카페 전화번호</p>
          <p>영업시간: 영업시간 정보</p>
        </styled.CafeInfo>
        <styled.SocialLinks>
          <a href="링크">SNS 아이콘</a>
          {/* SNS 아이콘은 원하는 SNS 아이콘 라이브러리를 사용하여 추가 */}
        </styled.SocialLinks>
        <styled.Terms>
          <Link to="/terms">이용약관</Link>
        </styled.Terms>
      </styled.Footer>
      <Accessmodal
        show={showModal}
        handleClose={() => setShowModal(false)}
        message="장바구니에 정보가 없음"
      />
    </styled.Container>
  );
};

export default Layout;
