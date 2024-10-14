package com.kiosk.api.sale.repository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import com.kiosk.api.sale.repository.dto.SalesResponseDto;
import com.kiosk.api.sale.repository.dto.TopProductResponseDto;

public interface SalesRepository {
    List<SalesResponseDto> findSalesBetweenDates(LocalDate startDate, LocalDate endDate);

    List<SalesResponseDto> findSalesByDate(LocalDate date);

    List<SalesResponseDto> findSalesByYear(int year);

    List<TopProductResponseDto> findTopProducts(int limit);

}
