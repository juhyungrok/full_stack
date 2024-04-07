// styles.js

import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow-x: auto; /* 가로 스크롤 항상 표시 */
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px; /* 헤더에 패딩 추가 */
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const CafeName = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const Slogan = styled.span`
  margin-left: 10px;
  font-size: 16px;
`;

export const CartLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const CartIcon = styled(FiShoppingCart)`
  font-size: 40px;
  text-bold: 3px;
`;

export const Footer = styled.footer`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #ccc;
`;

export const CafeInfo = styled.div`
  margin-bottom: 20px;
`;

export const SocialLinks = styled.div`
  a {
    margin-right: 10px;
    color: #333;
  }
`;

export const Terms = styled.div`
  a {
    color: #333;
  }
`;

export const MenuContainer = styled.nav`
  margin-bottom: 20px;

  div {
    display: flex;
  }

  button {
    margin-right: 10px;
    padding: 10px 20px;
    border: none;
    background-color: #ccc;
    color: #333;
    cursor: pointer;
  }

  button:hover {
    background-color: #999;
  }
`;

export const CategoryContainer = styled.div`
  margin-bottom: 20px;

  h1 {
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(
      auto-fill,
      minmax(250px, 1fr)
    ); // 기본적으로 한 줄에 2개의 카드를 표시
    gap: 20px; // 아이템 사이의 간격
  }

  @media screen and (max-width: 768px) {
    ul {
      grid-template-columns: repeat(
        2,
        1fr
      ); // 화면 크기가 작아질 때는 한 줄에 2개의 카드를 표시
    }
  }
`;

export const ProductCard = styled.li`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden; // 내용이 카드를 넘어갈 경우 처리

  img {
    width: 100%;
    display: block;
    border-radius: 10px 10px 0 0; // 상단 부분만 둥글게 처리
  }

  .product-info {
    padding: 20px;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
`;
export const ProductImage = styled.img`
  width: 200px;
  height: auto;
`;
