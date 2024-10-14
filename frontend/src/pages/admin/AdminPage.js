// src/pages/admin/AdminPage.js
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { allOrderinfo } from "../../api";

import ProductTable from "../admin/ProductTable";

const AdminPageContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const DateSection = styled.div`
  margin-bottom: 20px;
`;

const AdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchOrders = async () => {
      const orderData = await allOrderinfo();
      setOrders(orderData);
      filterOrdersByDate(orderData, selectedDate);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrdersByDate(orders, selectedDate);
  }, [orders, selectedDate]);

  const filterOrdersByDate = (orders, date) => {
    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.orderDatetime)
        .toISOString()
        .split("T")[0];
      return orderDate === date;
    });
    setFilteredOrders(filtered);
  };

  const handleDeleteOrder = (orderId) => {
    // 삭제 로직 구현
  };

  const handleSort = () => {
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.orderDatetime) - new Date(b.orderDatetime);
      } else {
        return new Date(b.orderDatetime) - new Date(a.orderDatetime);
      }
    });
    setFilteredOrders(sortedOrders);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <AdminPageContainer>
      <DateSection>
        <label>
          Select Date:
          <input type="date" value={selectedDate} onChange={handleDateChange} />
        </label>
      </DateSection>
      <ProductTable
        orders={filteredOrders}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        handleEditOrder={(id) => console.log(`Edit order ${id}`)}
        handleDeleteOrder={handleDeleteOrder}
        handleSort={handleSort}
        sortOrder={sortOrder}
      />
    </AdminPageContainer>
  );
};

export default AdminPage;
