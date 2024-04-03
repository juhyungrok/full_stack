import React from "react";
import styled from "styled-components";

const MenuHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 60px;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const BackButton = styled.button`
  font-size: 16px;
  font-weight: bold; /* 텍스트를 두껍게 만듭니다. */
  background-color: transparent;
  border: none;
`;

const MenuDetails = styled.div`
  margin-left: 20%;
  flex-grow: 1; /* MenuDetails 영역이 더 큰 공간을 차지하도록 설정합니다. */
`;

const Menu = styled.p`
  font-weight: bold; /* 메뉴 이름을 두껍게 만듭니다. */
  margin: 0;
`;

const DetailHeader = ({ menuName }) => {
  const goBack = () => {
    window.history.back(); // 브라우저의 뒤로가기 기능 사용
  };
  return (
    <MenuHeaderContainer>
      <BackButton onClick={goBack}>{"<"} 뒤로가기</BackButton>
      <MenuDetails>
        <Menu>{menuName}</Menu>
      </MenuDetails>
    </MenuHeaderContainer>
  );
};
export default DetailHeader;
