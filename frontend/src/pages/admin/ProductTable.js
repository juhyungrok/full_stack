import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ProductTableContainer = styled.div`
  width: 100%;
`;

const ProductTableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 18px;
`;

const TableHeader = styled.th`
  background-color: #f8f9fa;
  padding: 20px;
  text-align: left;
`;

const TableData = styled.td`
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  cursor: pointer;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${(props) => (props.danger ? "#dc3545" : "#007bff")};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

const ProductTable = ({
  orders,
  currentPage,
  itemsPerPage,
  handleEditOrder,
  handleDeleteOrder,
}) => {
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <ProductTableContainer>
      <ProductTableElement>
        <thead>
          <tr>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Order Number</TableHeader>
            <TableHeader>Order Date</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.orderId}>
              <Link
                to={`/admin/${order.orderId}`}
                style={{ display: "contents" }}
              >
                <TableData>{order.orderId}</TableData>
                <TableData>{order.orderNumber}</TableData>
                <TableData>{order.orderDatetime}</TableData>
              </Link>
              <TableData>
                {/* <ActionButton onClick={() => handleEditOrder(order.orderId)}>
                  Edit
                </ActionButton> */}
                <ActionButton
                  danger
                  onClick={() => handleDeleteOrder(order.orderId)}
                >
                  삭제
                </ActionButton>
              </TableData>
            </tr>
          ))}
        </tbody>
      </ProductTableElement>
    </ProductTableContainer>
  );
};

export default ProductTable;
