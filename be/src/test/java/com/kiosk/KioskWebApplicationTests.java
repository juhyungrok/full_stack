package com.kiosk;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kiosk.api.order.domain.entity.OrderProduct;
import com.kiosk.api.order.domain.repository.OrderProductRepository;
import com.kiosk.api.payment.domain.dto.PaymentRequestDto.CartInDto;
import com.kiosk.api.payment.domain.dto.PaymentRequestDto.KakaoPayByCardInDto;

import com.kiosk.api.payment.domain.dto.PaymentResultResponseDto;
import com.kiosk.api.payment.domain.entity.Payment;
import com.kiosk.api.payment.domain.entity.PaymentMethod;
import com.kiosk.api.payment.domain.repository.PaymentRepository;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles(profiles = "test")
@AutoConfigureMockMvc
class KioskWebApplicationTests {

        @Autowired
        private MockMvc mockMvc;

        @Autowired
        private PaymentRepository paymentRepository;

        @Autowired
        private OrderProductRepository orderProductRepository;

        @Test
        @DisplayName("/products 요청하여 메뉴들을 응답받습니다.")
        public void products() throws Exception {
                String expectByCategoryName = "$[%s].categoryName";
                String expectByCategoryId = "$[%s].categoryId";
                String expectByProducts = "$[%s].products";

                mockMvc.perform(get("/products"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath(expectByCategoryName, 0).exists())
                                .andExpect(jsonPath(expectByCategoryId, 0).exists())
                                .andExpect(jsonPath(expectByProducts, 0).isArray());
        }

        @Test
        @DisplayName("/api/payment/card 요청하여 카드 결제를 요청한다")
        @Transactional
        public void cardPayment() throws Exception {
                // given
                int totalPrice = 30400;
                List<CartInDto> orderProducts = new ArrayList<>();
                orderProducts.add(CartInDto.builder()
                                .productId(1L)
                                .size("large")
                                .temperature("hot")
                                .amount(2)
                                .name("아메리카노")
                                .build());
                orderProducts.add(CartInDto.builder()
                                .productId(1L)
                                .size("small")
                                .temperature("ice")
                                .amount(2)
                                .name("아메리카노")
                                .build());
                orderProducts.add(CartInDto.builder()
                                .productId(1L)
                                .size("small")
                                .temperature("hot")
                                .amount(2)
                                .name("아메리카노")
                                .build());
                KakaoPayByCardInDto payByCardInDto = KakaoPayByCardInDto.builder()
                                .totalPrice(totalPrice)
                                .orderProducts(orderProducts)
                                .build();

                // when
                String json = this.mockMvc.perform(post("/api/payment/card")
                                .content(new ObjectMapper().writeValueAsString(payByCardInDto))
                                .contentType(MediaType.APPLICATION_JSON))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.success").value(equalTo(true)))
                                .andExpect(jsonPath("$.data.orderId").exists())
                                .andExpect(jsonPath("$.errorCode.status").value(equalTo(200)))
                                .andExpect(jsonPath("$.errorCode.code").value(equalTo("SUCCESS")))
                                .andExpect(jsonPath("$.errorCode.message").value(equalTo("카드 결제 성공하였습니다.")))
                                .andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);

                // then
                PaymentResultResponseDto paymentResultResponseDto = new ObjectMapper().readValue(json,
                                PaymentResultResponseDto.class);
                Long orderId = Long.parseLong(String.valueOf(paymentResultResponseDto.getData().get("orderId")));

                Payment payment = paymentRepository.findByOrderId(orderId).orElseThrow();
                List<OrderProduct> findOrderProducts = orderProductRepository.findAllBy(orderId);
                SoftAssertions.assertSoftly(softAssertions -> {
                        // TODO: 주문검증

                        // 결제검증
                        softAssertions.assertThat(payment.getPaymentId()).isNotNull();
                        softAssertions.assertThat(payment.getMethod()).isEqualTo(PaymentMethod.KAKAOPAY);

                        softAssertions.assertThat(payment.getTotalPrice()).isEqualTo(totalPrice);
                        softAssertions.assertThat(payment.getOrderId()).isEqualTo(orderId);

                        // 주문상품 검증
                        softAssertions.assertThat(findOrderProducts.size()).isEqualTo(3);

                        softAssertions.assertAll();
                });

        }

}
