package com.kiosk.api.payment.controller;

import com.kiosk.api.payment.domain.dto.PaymentRequestDto.KakaoPayByCardInDto;

import com.kiosk.api.payment.domain.dto.PaymentRequestDto.TOSSPayByCardInDto;
import com.kiosk.api.payment.domain.dto.PaymentResultResponseDto;
import com.kiosk.api.payment.service.PaymentService;
import com.kiosk.api.websocket.Notification;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    private final SimpMessagingTemplate template;

    @PostMapping("/api/payment/tosspay")
    public PaymentResultResponseDto payByCash(@RequestBody final TOSSPayByCardInDto tossPayByCardInDto,
            final Long fail) {
        if (Objects.equals(fail, 400L)) {
            return handle400();
        }

        if (Objects.equals(fail, 500L)) {
            return handle500();
        }

        Long orderId = paymentService.createPaymentByCaedToss(tossPayByCardInDto);
        template.convertAndSend("/topic/notifications", new Notification("새로운 주문이 있습니다!"));
        return handle200(orderId, "토스 결제 성공하였습니다.");
    }

    @PostMapping("/api/payment/kakaopay")
    public PaymentResultResponseDto payByCard(@RequestBody final KakaoPayByCardInDto payByCardInDto, final Long fail) {
        if (Objects.equals(fail, 400L)) {
            return handle400();
        }

        if (Objects.equals(fail, 500L)) {
            return handle500();
        }

        Long orderId = paymentService.createPaymentByCardKaKao(payByCardInDto);
        return handle200(orderId, "카카오 결제 성공하였습니다.");
    }

    private PaymentResultResponseDto handle200(final Long orderId, final String message) {
        Map<String, Object> data = Map.of("orderId", orderId);
        Map<String, Object> errorCode = new HashMap<>();
        errorCode.put("status", 200);
        errorCode.put("code", "SUCCESS");
        errorCode.put("message", message);
        return new PaymentResultResponseDto(true, data, errorCode);
    }

    private PaymentResultResponseDto handle400() {
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> errorCode = new HashMap<>();
        errorCode.put("status", 400);
        errorCode.put("code", "PaymentError");
        errorCode.put("message", "결제가 실패했습니다. 잠시후에 시도해주세요.");
        return new PaymentResultResponseDto(false, data, errorCode);
    }

    private PaymentResultResponseDto handle500() {
        Map<String, Object> data = new HashMap<>();
        Map<String, Object> errorCode = new HashMap<>();
        errorCode.put("status", 500);
        errorCode.put("code", "ServerError");
        errorCode.put("message", "서버 에러입니다. 잠시 후에 이용해주세요.");
        return new PaymentResultResponseDto(false, data, errorCode);
    }
}
