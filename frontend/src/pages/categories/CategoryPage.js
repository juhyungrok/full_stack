// CategoryPage.js

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../api";

import Layout from "../../components/layout/Layout";
import * as styled from "../../components/style/Layout"; // MainPage와 동일한 스타일 import

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const allCategories = await getProducts();
        const foundCategory = allCategories.find(
          (category) => category.categoryId === parseInt(id)
        );
        setCategory(foundCategory);
      } catch (error) {
        console.log("Error fetching category:", error);
      }
    };

    fetchCategoryProducts();
  }, [id]);

  return (
    <Layout>
      <styled.CategoryContainer>
        {" "}
        {category && (
          <>
            <h1>{category.categoryName} Products</h1>
            <ul>
              {category.products.map((product) => (
                <styled.ProductCard key={product.productId}>
                  <Link to={`/details/${product.productId}`}>
                    <styled.ProductImage
                      src={product.imgUrl}
                      alt={product.name}
                    />
                  </Link>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>가격: {product.price}원</p>
                    {/* 추가 정보도 여기에 표시할 수 있습니다. */}
                  </div>
                </styled.ProductCard>
              ))}
            </ul>
          </>
        )}
      </styled.CategoryContainer>
    </Layout>
  );
};

export default CategoryPage;
