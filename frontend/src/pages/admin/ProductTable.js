// src/components/admin/ProductTable.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { viewSales } from "../../api/index"; // 필요한 API 호출 함수

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
  cursor: pointer; /* Add cursor pointer to indicate sortable columns */
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

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: ${(props) =>
    props.active === "true" ? "#007bff" : "#fff"};
  color: ${(props) => (props.active === "true" ? "#fff" : "#007bff")};
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
`;

const ItemsPerPageSelect = styled.select`
  margin-left: 10px;
`;

const ProductTable = ({
  orders,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  handleEditOrder,
  handleDeleteOrder,
  handleSort,
  sortOrder,
}) => {
  const [todaySales, setTodaySales] = useState(0);
  const [yesterdaySales, setYesterdaySales] = useState(0);
  const [salesIncrease, setSalesIncrease] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      try {
        const todayResponse = await viewSales(today);
        const yesterdayResponse = await viewSales(yesterday);

        const todayData =
          todayResponse.length > 0 ? todayResponse[0].totalSales : 0;
        const yesterdayData =
          yesterdayResponse.length > 0 ? yesterdayResponse[0].totalSales : 0;

        setTodaySales(todayData);
        setYesterdaySales(yesterdayData);

        const increase = yesterdayData
          ? ((todayData - yesterdayData) / yesterdayData) * 100
          : 0;
        setSalesIncrease(increase);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((page) => (
      <PageButton
        key={page}
        active={(page === currentPage).toString()}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </PageButton>
    ));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <ProductTableContainer>
      <div>오늘 총 매출 금액: {todaySales.toLocaleString()}원</div>
      <div>
        어제 대비 매출 상승률:{" "}
        {isNaN(salesIncrease) ? 0 : salesIncrease.toFixed(2)}%
      </div>
      <div>
        Items per page:
        <ItemsPerPageSelect
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </ItemsPerPageSelect>
      </div>
      <ProductTableElement>
        <thead>
          <tr>
            <TableHeader onClick={handleSort}>
              Order Date {sortOrder === "asc" ? "▲" : "▼"}
            </TableHeader>
            <TableHeader>Order ID</TableHeader>
            <TableHeader>Order Number</TableHeader>
            <TableHeader></TableHeader>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders.map((order) => (
            <tr key={order.orderId}>
              <StyledLink
                to={`/admin/${order.orderId}`}
                style={{ display: "contents" }}
              >
                <TableData>{order.orderDatetime}</TableData>
                <TableData>{order.orderId}</TableData>
                <TableData>{order.orderNumber}</TableData>
              </StyledLink>
              <TableData>
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
      <PaginationContainer>{renderPagination()}</PaginationContainer>
    </ProductTableContainer>
  );
};

export default ProductTable;
