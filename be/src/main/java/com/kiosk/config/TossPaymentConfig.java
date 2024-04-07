package com.kiosk.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;

@Configuration
@Getter
public class TossPaymentConfig {
    @Value("${payment.toss.test_client_api_key}")
    private String tetClientApiKey;

    @Value("${payment.toss.test_secreate_api_key}")
    private String testSecretKey;

    @Value("${payment.toss.success_url}")
    private String succssfulUrl;

    @Value("${payment.toss.fail_url}")
    private String failUrl;

    public static final String URL = "https://api.tosspaymenys.com/v1/payments/";
    // 토스페이먼트에 결제 승인 요청 보낼 URL

}
