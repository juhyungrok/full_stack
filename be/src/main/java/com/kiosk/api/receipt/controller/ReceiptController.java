package com.kiosk.api.receipt.controller;

import com.kiosk.api.order.domain.entity.Orders;
import com.kiosk.api.receipt.domain.dto.ReceiptResponseDto;
import com.kiosk.api.receipt.domain.entity.Receipt;
import com.kiosk.api.receipt.service.ReceiptService;
import com.mysql.cj.x.protobuf.MysqlxCrud.Order;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
public class ReceiptController {

    private final ReceiptService receiptService;

    @GetMapping("/api/receipt")
    public ReceiptResponseDto getReceiptInformation(@RequestParam Long orderId) {
        // TODO: orderId가 유효한지 확인
        Receipt receipt = receiptService.getReceiptInformation(orderId);
        return ReceiptResponseDto.from(receipt);
    }

    // 모든 주문에 대한 주문 정보를 반환하는 엔드포인트
    @GetMapping("/api/receipt/all")
    public ResponseEntity<List<Orders>> getAllOrders() {
        List<Orders> allOrders = receiptService.getAllOrders();
        return ResponseEntity.ok(allOrders);
    }

}