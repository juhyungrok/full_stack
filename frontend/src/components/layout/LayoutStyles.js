// LayoutStyles.js

import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
`;

export const CafeName = styled.h1`
  margin: 0;
  font-size: 30px;
`;

export const Slogan = styled.span`
  margin-left: 10px;
  font-size: 15px;
  display: flex;
  align-items: center;
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
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  @media screen and (max-width: 768px) {
    ul {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export const ProductCard = styled.li`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    border-radius: 10px 10px 0 0;
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

export const HeaderIcon = styled.img`
  width: 30%;
  height: 30%;
  margin-right: 10px;
`;
