import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { fetchReceipt } from "../../api";
import AdminDetailLayout from "./AdminDetailLayout";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BackButton = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
`;

const Title = styled.h1`
  font-size: 36px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const AdminOrderDetailPage = () => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const detail = await fetchReceipt(orderId);
        setOrderDetail(detail);
      } catch (error) {
        console.error("Failed to fetch order detail:", error);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  if (!orderDetail) {
    return <div>Loading...</div>;
  }

  return (
    <AdminDetailLayout>
      <Header>
        <BackButton to="/admin">뒤로가기</BackButton>
        <Title>주문 사항</Title>
        <div>관리자 페이지</div>
      </Header>
      <Section>
        <SubTitle>주문 정보</SubTitle>
        <p>주문 번호: {orderDetail.orders.orderId}</p>
        <p>날짜 : {orderDetail.orders.orderDatetime}</p>
        <p>순서 : {orderDetail.orders.orderNumber}</p>
      </Section>
      <Section>
        <SubTitle>상품 정보</SubTitle>
        {orderDetail.orderProducts.map((product, index) => (
          <div key={index}>
            <p>이름: {product.name}</p>
            <p>수량: {product.amount}개</p>
            <p>사이즈: {product.size}</p>
            <p>핫/아이스: {product.temperature}</p>
          </div>
        ))}
      </Section>
      <Section>
        <SubTitle>결제 정보</SubTitle>
        <p>총 금액: {orderDetail.payment.totalPrice}원 </p>
        <p>결제수단: {orderDetail.payment.method}</p>
      </Section>
    </AdminDetailLayout>
  );
};

export default AdminOrderDetailPage;
