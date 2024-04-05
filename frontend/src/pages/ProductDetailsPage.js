import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../api";
import DetailHeader from "../components/menu/DetailHeader";
import QuantityButton from "../components/button/QuantityButton";

import styled from "styled-components";
import TemperatureButton from "../components/button/TemperatureButton";
import SizeButton from "../components/button/SizeButton";
import OrderInfoModule from "../components/menu/OrderInfoModule";
import AddToCartButton from "../components/button/AddtoCartButton";

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
`;

const SectionContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const OptionTitle = styled.p`
  font-size: 150%;
  font-weight: bold;
  color: #4d4d4d;
  margin-bottom: 10%;
`;

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState(1);
  const [selectedTemperature, setSelectedTemperature] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const incrementAmount = () => {
    setAmount(amount + 1);
  };

  const decrementAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handleTemperatureClick = (temperature) => {
    setSelectedTemperature(temperature);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const categories = await getProducts();
        const foundProduct = categories
          .flatMap((cat) => cat.products)
          .find((prod) => prod.productId === parseInt(productId));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.log("Error fetching product: ", error);
      }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      console.log("Cart items in localStorage:");
      console.log(JSON.parse(storedCart));
    } else {
      console.log("No cart items found in localStorage.");
    }
  }, []);

  return (
    <ProductContainer>
      {product && (
        <>
          <DetailHeader menuName={product.name} />
          <img src={product.imgUrl} alt={product.name} />
          <p>{product.price}원</p>
          <OptionContainer>
            <OptionTitle>온도</OptionTitle>
            <SectionContainer>
              <TemperatureButton
                temperature="Hot"
                selectedTemperature={selectedTemperature}
                handleTemperatureClick={handleTemperatureClick}
                disabled={!product.hasHot}
              />
              <TemperatureButton
                temperature="ice"
                selectedTemperature={selectedTemperature}
                handleTemperatureClick={handleTemperatureClick}
                disabled={!product.hasIce}
              />
            </SectionContainer>
          </OptionContainer>
          <OptionContainer>
            <OptionTitle>사이즈</OptionTitle>
            <SectionContainer>
              <SizeButton
                size="Large"
                selectedSize={selectedSize}
                handleSizeClick={handleSizeClick}
                disabled={!product.hasLarge}
              />
              <SizeButton
                size="Small"
                selectedSize={selectedSize}
                handleSizeClick={handleSizeClick}
                disabled={!product.hasSmall}
              />
            </SectionContainer>
          </OptionContainer>
          <SectionContainer>
            <p>수량:</p>
            <QuantityButton
              amount={amount}
              incrementAmount={incrementAmount}
              decrementAmount={decrementAmount}
            />
          </SectionContainer>
          <OrderInfoModule
            total={product.price * amount}
            product={{
              productId: productId,
              name: product.name,
              amount: amount,
              imgUrl: product.imgUrl,
              price: product.price,
              selectedTemperature: selectedTemperature,
              selectedSize: selectedSize,
            }}
          />
          {/* 주문 정보 모듈 추가 */}
          <SectionContainer>
            <AddToCartButton
              product={{
                productId: productId,
                name: product.name,
                amount: amount,
                imgUrl: product.imgUrl,
                price: product.price,
                selectedTemperature: selectedTemperature,
                selectedSize: selectedSize,
              }}
            />
          </SectionContainer>
        </>
      )}
    </ProductContainer>
  );
};

export default ProductDetailsPage;
