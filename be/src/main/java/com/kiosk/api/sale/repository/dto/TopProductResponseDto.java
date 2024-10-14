package com.kiosk.api.sale.repository.dto;

public class TopProductResponseDto {
    private String productName;
    private int totalSold;

    public TopProductResponseDto(String productName, int totalSold) {
        this.productName = productName;
        this.totalSold = totalSold;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getTotalSold() {
        return totalSold;
    }

    public void setTotalSold(int totalSold) {
        this.totalSold = totalSold;
    }
}