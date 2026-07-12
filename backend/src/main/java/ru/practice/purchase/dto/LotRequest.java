package ru.practice.purchase.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LotRequest(
        String lotName,
        String customerCode,
        BigDecimal price,
        String currencyCode,
        String ndsRate,
        String placeDelivery,
        LocalDateTime dateDelivery
) {
}
