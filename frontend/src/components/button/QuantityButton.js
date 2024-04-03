import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  margin: 5px;
  background-color: ${(props) => (props.selected ? "#000000" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "#ffffff" : "#000000")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const QuantityButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton1 = styled(Button)`
  font-size: 14px;
  padding: 8px 12px;
`;

const QuantityButton = ({ amount, incrementAmount, decrementAmount }) => {
  return (
    <QuantityButtonContainer>
      <Button onClick={decrementAmount}>-</Button>
      <QuantityButton1>{amount}</QuantityButton1>
      <Button onClick={incrementAmount}>+</Button>
    </QuantityButtonContainer>
  );
};

export default QuantityButton;
