import React from "react";
import styled from "styled-components";

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  margin: 5px;
  background-color: ${(props) =>
    props.selected ? "#d2b48c" : props.disabled ? "#f0f0f0" : "#ffffff"};
  color: ${(props) => (props.selected ? "#ffffff" : "#000000")};
  border: 2px solid #d2b48c; /* Add border */
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  display: ${(props) =>
    props.disabled ? "none" : "block"}; /* hide button if disabled */
  &:hover {
    background-color: ${(props) =>
      props.disabled ? "#f0f0f0" : "#d2b48c"}; /* light brown color on hover */
  }
`;

const SizeButton = ({ size, selectedSize, handleSizeClick, disabled }) => {
  return (
    <Button
      onClick={() => handleSizeClick(size)}
      selected={selectedSize === size}
      disabled={disabled}
    >
      {size}
    </Button>
  );
};

export default SizeButton;
