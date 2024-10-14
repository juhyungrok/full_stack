package com.kiosk.api.sale.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kiosk.api.sale.repository.SalesRepository;
import com.kiosk.api.sale.repository.dto.SalesResponseDto;
import com.kiosk.api.sale.repository.dto.TopProductResponseDto;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class SalesService {

    private final SalesRepository salesRepository;

    @Autowired
    public SalesService(SalesRepository salesRepository) {
        this.salesRepository = salesRepository;
    }

    public List<SalesResponseDto> compareSales(LocalDate startDate, LocalDate endDate) {
        // Logic to compare sales between two dates
        return salesRepository.findSalesBetweenDates(startDate, endDate);
    }

    public List<SalesResponseDto> viewSales(LocalDate date) {
        // Logic to view sales on a specific date
        return salesRepository.findSalesByDate(date);
    }

    public List<SalesResponseDto> viewMonthlySales(int year) {
        return salesRepository.findSalesByYear(year);
    }

    public List<TopProductResponseDto> getTopProducts(int limit) {
        return salesRepository.findTopProducts(limit);
    }

}
