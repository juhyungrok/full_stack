import styled from "styled-components";

const Footer = styled.footer`
  background-color: #fff;
  border-top: 2px solid #ddd;
  padding: 10px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 95%;
  z-index: 100;

  .total-amount {
    margin-bottom: 10px;
    font-size: 16px;
  }

  button {
    background-color: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    font-size: 16px;
    font-weight: bold;
  }
  @media (min-width: 768px) {
    /* 데스크탑 화면일 때의 스타일 */
    width: 50%;
  }
`;

export default Footer;
