package com.kiosk.api.payment.service;

import com.kiosk.api.order.service.OrderProductService;
import com.kiosk.api.order.service.OrdersService;
import com.kiosk.api.payment.domain.dto.PaymentRequestDto;

import com.kiosk.api.payment.domain.dto.PaymentRequestDto.TOSSPayByCardInDto;
import com.kiosk.api.payment.domain.entity.Payment;
import com.kiosk.api.payment.domain.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final OrdersService ordersService;
    private final OrderProductService orderProductService;

    @Transactional
    public Long createPaymentByCaedToss(final PaymentRequestDto.TOSSPayByCardInDto tossPayByCardInDto) {
        // 주문 생성
        Long orderId = (long) ordersService.createOrder();

        // orderId로 orderProducts 완성해서 모두 저장하기
        List<PaymentRequestDto.CartInDto> orderProducts = tossPayByCardInDto.getOrderProducts();
        orderProductService.saveOrderProductsWithOrderId(orderId, orderProducts);

        // 총액이랑 받은 돈으로 거스름 돈 계산해서 payment 저장하기
        Payment payment = tossPayByCardInDto.toEntity(orderId);
        return paymentRepository.save(payment);
    }

    @Transactional
    public Long createPaymentByCardKaKao(final PaymentRequestDto.KakaoPayByCardInDto payByCardInDto) {
        // 주문 생성
        Long orderId = (long) ordersService.createOrder();

        // orderId로 orderProducts 완성해서 모두 저장하기
        List<PaymentRequestDto.CartInDto> orderProducts = payByCardInDto.getOrderProducts();
        orderProductService.saveOrderProductsWithOrderId(orderId, orderProducts);

        // 총액이랑 받은 돈으로 거스름 돈 계산해서 payment 저장하기
        Payment payment = payByCardInDto.toEntity(orderId);
        return paymentRepository.save(payment);
    }
}
