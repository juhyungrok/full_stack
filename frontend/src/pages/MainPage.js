// MainPage 컴포넌트 수정

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { getProducts } from "../api";
import * as styled from "../components/style/Layout";

const MainPage = () => {
  const [bestProducts, setBestProducts] = useState([]);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const products = await getProducts();
        const bestProducts = products.reduce((acc, category) => {
          return [
            ...acc,
            ...category.products.filter((product) => product.isBest),
          ];
        }, []);
        setBestProducts(bestProducts);
      } catch (error) {
        console.log("error best products:", error);
      }
    };
    fetchBestProducts();
  }, []);

  return (
    <Layout>
      <styled.CategoryContainer>
        <h1>Best Products</h1>
        <ul>
          {bestProducts.map((product) => (
            <styled.ProductCard key={product.productId}>
              <Link to={`/details/${product.productId}`}>
                <styled.ProductImage src={product.imgUrl} alt={product.name} />
              </Link>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>가격 : {product.price}원</p>
              </div>
            </styled.ProductCard>
          ))}
        </ul>
      </styled.CategoryContainer>
    </Layout>
  );
};

export default MainPage;
