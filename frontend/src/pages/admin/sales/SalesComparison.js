// src/components/SalesComparison.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import {
  compareSales,
  viewSales,
  viewMonthlySales,
  getTopProducts,
} from "../../../api/index.js";

// Chart.js 모듈을 수동으로 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Chart.js 기본 설정 수정
defaults.font.family = "Arial, sans-serif"; // 기본 폰트 설정
defaults.locale = "ko"; // 한글 로케일 설정

const SalesComparisonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  flex: 1 1 calc(50% - 20px);
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  margin-top: 0;
`;

const SalesComparison = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [chartData, setChartData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState({ labels: [], datasets: [] });
  const [topProducts, setTopProducts] = useState(null);

  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    )
      .toISOString()
      .split("T")[0];

    setStartDate(firstDayOfMonth);
    setEndDate(lastDayOfMonth);

    fetchSalesData(firstDayOfMonth, lastDayOfMonth);
    fetchMonthlySalesData(year);
    fetchTopProducts();
  }, [year]);

  const fetchSalesData = async (start, end) => {
    try {
      const data = await compareSales(start, end);
      if (data) {
        const dates = data.map((item) => item.date);
        const sales = data.map((item) => item.totalSales);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: "매출",
              data: sales,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.2)",
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching sales data", error);
    }
  };

  const fetchDailySalesData = async (date) => {
    try {
      const data = await viewSales(date);
      if (data) {
        const newLabels = [...dailyData.labels, data[0].date];
        const newSales = [
          ...(dailyData.datasets[0]?.data || []),
          data[0].totalSales,
        ];

        setDailyData({
          labels: newLabels,
          datasets: [
            {
              label: "일 매출",
              data: newSales,
              borderColor: "rgba(153,102,255,1)",
              backgroundColor: "rgba(153,102,255,0.2)",
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching daily sales data", error);
    }
  };

  const fetchMonthlySalesData = async (year) => {
    try {
      const data = await viewMonthlySales(year);
      if (data) {
        const months = data.map((item) => item.date);
        const sales = data.map((item) => item.totalSales);

        setMonthlyData({
          labels: months,
          datasets: [
            {
              label: "월 매출",
              data: sales,
              borderColor: "rgba(255,159,64,1)",
              backgroundColor: "rgba(255,159,64,0.2)",
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching monthly sales data", error);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const data = await getTopProducts(5);
      if (data) {
        setTopProducts(data);
      }
    } catch (error) {
      console.error("Error fetching top products", error);
    }
  };

  return (
    <SalesComparisonContainer>
      <Card>
        <CardTitle>기간별 매출 비교</CardTitle>
        <div>
          <label>
            시작 날짜:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            종료 날짜:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={() => fetchSalesData(startDate, endDate)}>
            매출 데이터 가져오기
          </button>
        </div>
        <div>
          {chartData ? <Line data={chartData} /> : <div>로딩 중...</div>}
        </div>
      </Card>
      <Card>
        <CardTitle>일 매출</CardTitle>
        <div>
          <label>
            날짜:
            <input
              type="date"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={() => fetchDailySalesData(specificDate)}>
            일 매출 데이터 가져오기
          </button>
        </div>
        <div>
          {dailyData.labels.length ? (
            <Line data={dailyData} />
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      </Card>
      <Card>
        <CardTitle>월 매출</CardTitle>
        <div>
          <label>
            연도:
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button onClick={() => fetchMonthlySalesData(year)}>
            월 매출 데이터 가져오기
          </button>
        </div>
        <div>
          {monthlyData ? <Line data={monthlyData} /> : <div>로딩 중...</div>}
        </div>
      </Card>
      <Card>
        <CardTitle>인기 제품</CardTitle>
        <ul>
          {topProducts ? (
            topProducts.map((product, index) => (
              <li key={index}>
                {index + 1}위: {product.productName} - {product.totalSold} 개
              </li>
            ))
          ) : (
            <div>로딩 중...</div>
          )}
        </ul>
      </Card>
    </SalesComparisonContainer>
  );
};

export default SalesComparison;
