// CartStyles.js
import styled from "styled-components";

export const StyledCartLayout = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff; /* 추가: 배경색을 흰색으로 설정 */
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const StyledContent = styled.div`
  margin-bottom: 20px;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; /* 추가: 아이템을 세로 중앙 정렬 */
`;

export const StyledCartComponent = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  background-color: #fff; /* 추가: 배경색을 흰색으로 설정 */
`;

export const StyledCartItem = styled.li`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;

  .image-container {
    width: 100px;
    margin-right: 20px;
  }

  img {
    width: 100%;
    height: auto;
  }

  .item-details {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap; /* 추가: 내용이 넘칠 경우 줄 바꿈 */
  }

  .actions button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: red;
  }
`;
export const StyledOptions = styled.div`
  font-size: 0.8em;
  margin-top: 0.5em;
`;

export const StyledQuantityControl = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 5px 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  span {
    margin: 0 10px;
  }
`;
