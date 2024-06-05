import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductTable from "./ProductTable";
import { allOrderinfo } from "../../api/index.js";

const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 40px;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DateSection = styled.div`
  display: flex;
  align-items: center;
`;

const DateDropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 10px;
`;

const DateDropdownButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

const DateDropdownContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: absolute;
  background-color: white;
  min-width: 100px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DateDropdownItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
`;

const SalesComparisonButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;

const ItemsPerPageSection = styled.div`
  display: flex;
  align-items: center;
`;

const ItemsPerPageLabel = styled.label`
  margin-right: 10px;
  font-size: 16px;
`;

const ItemsPerPageSelect = styled.select`
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
const ArrowButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #fff;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 5px;
`;
const NoOrdersMessage = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;

const AdminLayout = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth() + 1);
    setSelectedDay(today.getDate());
    fetchOrders(today.getFullYear(), today.getMonth() + 1, today.getDate());
  }, []);

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5; // 최대 5개의 페이지 번호 표시
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    if (totalPages <= maxPageNumbers) {
      // 전체 페이지 수가 5 이하인 경우
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 전체 페이지 수가 6 이상인 경우
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPageNumbers / 2)
      );
      const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

      if (startPage > 1) {
        pageNumbers.push(1); // 첫 번째 페이지 번호 추가
        if (startPage > 2) {
          pageNumbers.push(-1); // 이전 페이지 화살표 추가
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push(-2); // 다음 페이지 화살표 추가
        }
        pageNumbers.push(totalPages); // 마지막 페이지 번호 추가
      }
    }

    return pageNumbers.map((page) => {
      if (page === -1) {
        return (
          <ArrowButton
            key="prev"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </ArrowButton>
        );
      } else if (page === -2) {
        return (
          <ArrowButton
            key="next"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </ArrowButton>
        );
      } else {
        return (
          <PageButton
            key={page}
            active={(page === currentPage).toString()}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </PageButton>
        );
      }
    });
  };
  const fetchOrders = async (year, month, day) => {
    try {
      const orders = await allOrderinfo();
      const filteredData = orders.filter((order) => {
        const orderDate = new Date(order.orderDatetime);
        return (
          orderDate.getFullYear() === year &&
          orderDate.getMonth() + 1 === month &&
          orderDate.getDate() === day
        );
      });
      setOrders(orders);
      setFilteredOrders(filteredData);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleYearClick = () => {
    setIsYearOpen(!isYearOpen);
    setIsMonthOpen(false);
    setIsDayOpen(false);
  };

  const handleMonthClick = () => {
    setIsMonthOpen(!isMonthOpen);
    setIsYearOpen(false);
    setIsDayOpen(false);
  };

  const handleDayClick = () => {
    setIsDayOpen(!isDayOpen);
    setIsYearOpen(false);
    setIsMonthOpen(false);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsYearOpen(false);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsMonthOpen(false);
    setSelectedDay(""); // Reset day selection when month changes
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setIsDayOpen(false);
  };

  const handleSearch = () => {
    fetchOrders(selectedYear, selectedMonth, selectedDay);
  };

  const handleSalesComparison = () => {
    console.log("Sales Comparison clicked");
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();

  return (
    <AdminContainer>
      <Title>관리자 페이지</Title>
      <TopSection>
        <DateSection>
          <DateDropdown>
            <DateDropdownButton onClick={handleYearClick}>
              {selectedYear || "Year"}
            </DateDropdownButton>
            <DateDropdownContent isOpen={isYearOpen}>
              {Array.from({ length: 30 }, (_, index) => (
                <DateDropdownItem
                  key={index}
                  onClick={() => handleYearSelect(2021 + index)}
                >
                  {2021 + index}
                </DateDropdownItem>
              ))}
            </DateDropdownContent>
          </DateDropdown>
          <DateDropdown>
            <DateDropdownButton onClick={handleMonthClick}>
              {selectedMonth || "Month"}
            </DateDropdownButton>
            <DateDropdownContent isOpen={isMonthOpen}>
              {Array.from({ length: 12 }, (_, index) => (
                <DateDropdownItem
                  key={index}
                  onClick={() => handleMonthSelect(index + 1)}
                >
                  {index + 1}
                </DateDropdownItem>
              ))}
            </DateDropdownContent>
          </DateDropdown>
          <DateDropdown>
            <DateDropdownButton onClick={handleDayClick}>
              {selectedDay || "Day"}
            </DateDropdownButton>
            <DateDropdownContent isOpen={isDayOpen}>
              {Array.from({ length: daysInMonth }, (_, index) => (
                <DateDropdownItem
                  key={index}
                  onClick={() => handleDaySelect(index + 1)}
                >
                  {index + 1}
                </DateDropdownItem>
              ))}
            </DateDropdownContent>
          </DateDropdown>
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </DateSection>
        <ItemsPerPageSection>
          <ItemsPerPageLabel>보여질 항목 수:</ItemsPerPageLabel>
          <ItemsPerPageSelect
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </ItemsPerPageSelect>
        </ItemsPerPageSection>
        <SalesComparisonButton onClick={handleSalesComparison}>
          매출 비교(error)
        </SalesComparisonButton>
      </TopSection>

      {filteredOrders.length > 0 ? (
        <>
          <ProductTable
            orders={filteredOrders}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            handleEditOrder={(id) => console.log(`Edit order ${id}`)}
            handleDeleteOrder={(id) => console.log(`Delete order ${id}`)}
          />
          <PaginationContainer>{renderPagination()}</PaginationContainer>
        </>
      ) : (
        <NoOrdersMessage>주문 내역이 없습니다.</NoOrdersMessage>
      )}
    </AdminContainer>
  );
};

export default AdminLayout;
