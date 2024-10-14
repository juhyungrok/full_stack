package com.kiosk.api.sale;

import java.util.List;
import java.time.LocalDate;
import java.time.YearMonth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.kiosk.api.sale.repository.dto.SalesResponseDto;
import com.kiosk.api.sale.repository.dto.TopProductResponseDto;
import com.kiosk.api.sale.service.SalesService;

@RestController
@RequestMapping("/api/sales")
public class SalesController {

    private final SalesService salesService;

    @Autowired
    public SalesController(SalesService salesService) {
        this.salesService = salesService;
    }

    // 기간별 매출 조회
    @GetMapping("/compare")
    public List<SalesResponseDto> compareSales(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate) {
        return salesService.compareSales(startDate, endDate);
    }

    // 일 매출 조회
    @GetMapping("/view")
    public List<SalesResponseDto> viewSales(
            @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate date) {
        return salesService.viewSales(date);
    }

    // 월 별 매출
    @GetMapping("/monthly")
    public List<SalesResponseDto> viewMonthlySales(
            @RequestParam("year") int year) {
        return salesService.viewMonthlySales(year);
    }

    // 제품 인기 순위
    @GetMapping("/top-products")
    public List<TopProductResponseDto> getTopProducts(
            @RequestParam("limit") int limit) {
        return salesService.getTopProducts(limit);
    }
}