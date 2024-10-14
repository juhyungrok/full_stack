package com.kiosk.api.order.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class OrderLog {
    private String salesDate;
    private Long categoryId;
    private Long productId;
    private Long salesAmount;

}
