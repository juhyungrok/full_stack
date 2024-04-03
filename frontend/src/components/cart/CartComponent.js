import React, { useEffect, useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px;
`;

const ProductImage = styled.img`
  width: 30%;
  height: 30%;
  object-fit: cover;
  margin-right: 10px;
`;

const ProductInfo = styled.div`
  display: flex; /* 이미지와 내용을 나란히 표시하기 위해 flex 사용 */
  flex-direction: column;
  flex-grow: 1; /* ProductInfo가 남은 공간을 모두 차지하도록 설정 */
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Price = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Options = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
`;

const QuantityButtons = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  margin: 10%; /* 버튼 사이 간격 추가 */
  font-size: 16px;
`;

const RemoveButton = styled.button`
  align-self: flex-top; /* 우측 하단에 배치 */
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 14px;
  margin-top: 5px; /* 버튼 위에 간격 추가 */
  transition: background-color 0.3s;
  &:hover {
    background-color: #e00007;
  }
`;

const CartComponent = ({ cartItems, onUpdate }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLoading(false);
  }, []);

  const handleRemoveItem = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    onUpdate(updatedCart);
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].amount += 1;
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    onUpdate(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].amount > 1) {
      updatedCart[index].amount -= 1;
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      onUpdate(updatedCart);
    }
  };

  return (
    <div>
      {loading && <p>데이터를 불러오는 중입니다...</p>}
      {!loading && cartItems.length === 0 && <p>장바구니가 비어 있습니다.</p>}
      {!loading && cartItems.length > 0 && (
        <ul>
          {cartItems.map((item, index) => (
            <CardContainer key={index}>
              <ProductImage
                src={item.imgUrl}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <ProductInfo>
                <ProductName>{item.name}</ProductName>

                <Options>
                  {item.selectedSize && <p>사이즈: {item.selectedSize}</p>}
                  {item.selectedTemperature && (
                    <p>온도: {item.selectedTemperature}</p>
                  )}
                </Options>
                <Price>{(item.price * item.amount).toLocaleString()}원</Price>
                <QuantityButtons>
                  <QuantityButton onClick={() => handleDecrement(index)}>
                    -
                  </QuantityButton>
                  <span>{item.amount}</span>
                  <QuantityButton onClick={() => handleIncrement(index)}>
                    +
                  </QuantityButton>
                </QuantityButtons>
              </ProductInfo>
              <RemoveButton onClick={() => handleRemoveItem(index)}>
                삭제
              </RemoveButton>
            </CardContainer>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartComponent;
