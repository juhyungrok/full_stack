package com.kiosk.api.sale.repository;

import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.kiosk.api.sale.repository.dto.SalesResponseDto;
import com.kiosk.api.sale.repository.dto.TopProductResponseDto;

@Repository
public class JdbcSalesRepositoryImpl implements SalesRepository {
    private final JdbcTemplate jdbcTemplate;

    public JdbcSalesRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private RowMapper<SalesResponseDto> salesRowMapper = new RowMapper<SalesResponseDto>() {
        @Override
        public SalesResponseDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new SalesResponseDto(
                    rs.getDate("date").toLocalDate(),
                    rs.getBigDecimal("total_sales"));
        }
    };
    private RowMapper<TopProductResponseDto> topProductRowMapper = new RowMapper<TopProductResponseDto>() {
        @Override
        public TopProductResponseDto mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new TopProductResponseDto(
                    rs.getString("product_name"),
                    rs.getInt("total_sold"));
        }
    };

    @Override
    public List<SalesResponseDto> findSalesBetweenDates(LocalDate startDate, LocalDate endDate) {
        String sql = "SELECT DATE(o.order_datetime) as date, SUM(p.payment_total_price) as total_sales " +
                "FROM orders o " +
                "JOIN payment p ON o.order_id = p.order_id " +
                "WHERE DATE(o.order_datetime) BETWEEN ? AND ? " +
                "GROUP BY DATE(o.order_datetime)";
        return jdbcTemplate.query(sql, salesRowMapper, startDate, endDate);
    }

    @Override
    public List<SalesResponseDto> findSalesByDate(LocalDate date) {
        String sql = "SELECT DATE(o.order_datetime) as date, SUM(p.payment_total_price) as total_sales " +
                "FROM orders o " +
                "JOIN payment p ON o.order_id = p.order_id " +
                "WHERE DATE(o.order_datetime) = ? " +
                "GROUP BY DATE(o.order_datetime)";
        return jdbcTemplate.query(sql, salesRowMapper, date);
    }

    @Override
    public List<SalesResponseDto> findSalesByYear(int year) {
        String sql = "SELECT DATE_FORMAT(o.order_datetime, '%Y-%m') as date, SUM(p.payment_total_price) as total_sales "
                +
                "FROM orders o " +
                "JOIN payment p ON o.order_id = p.order_id " +
                "WHERE YEAR(o.order_datetime) = ? " +
                "GROUP BY DATE_FORMAT(o.order_datetime, '%Y-%m')";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            String yearMonth = rs.getString("date") + "-01";
            return new SalesResponseDto(
                    LocalDate.parse(yearMonth),
                    rs.getBigDecimal("total_sales"));
        }, year);
    }

    @Override
    public List<TopProductResponseDto> findTopProducts(int limit) {
        String sql = "SELECT op.order_product_name as product_name, SUM(op.order_product_amount) as total_sold " +
                "FROM order_product op " +
                "GROUP BY op.order_product_name " +
                "ORDER BY total_sold DESC " +
                "LIMIT ?";
        return jdbcTemplate.query(sql, topProductRowMapper, limit);
    }
}
