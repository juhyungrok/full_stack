package com.kiosk.api.sale.repository.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class SalesResponseDto {

    private LocalDate date;
    private BigDecimal totalSales;

    public SalesResponseDto(LocalDate date, BigDecimal totalSales) {
        this.date = date;
        this.totalSales = totalSales;
    }

    // Getters and setters
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public BigDecimal getTotalSales() {
        return totalSales;
    }

    public void setTotalSales(BigDecimal totalSales) {
        this.totalSales = totalSales;
    }

}
