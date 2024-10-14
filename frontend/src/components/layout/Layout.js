// Layout.js

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../menu/Menu";
import * as styled from "./LayoutStyles";
import Accessmodal from "../modal/Accessmodal";
import cafeimg from "../../images/cafe.png";

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
          <styled.CafeName>KIOSK</styled.CafeName>
          <styled.Slogan>
            <styled.HeaderIcon src={cafeimg} alt="핸드폰으로 주문하기!" />
            핸드폰에서 주문하기!
          </styled.Slogan>
        </styled.Logo>
        <styled.CartLink onClick={checkCart}>
          <styled.CartIcon />
        </styled.CartLink>
      </styled.Header>
      <Menu />
      <main>{children}</main>
      <styled.Footer>
        <styled.CafeInfo>
          <p>사색볼펜 : 주형록 | 정재호 | 우상욱</p>
          <p>카페키오스크: Non-Display</p>
        </styled.CafeInfo>
        <styled.SocialLinks>
          <a href="https://github.com/juhyungrok/full_stack">깃허브 정보</a>
          {/* SNS 아이콘은 원하는 SNS 아이콘 라이브러리를 사용하여 추가 */}
        </styled.SocialLinks>
        <styled.Terms>
          <Link to="https://glory-phone-a3d.notion.site/bbb0816dd4314b60832ce953b9334bbb?pvs=4">
            이용약관
          </Link>
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
