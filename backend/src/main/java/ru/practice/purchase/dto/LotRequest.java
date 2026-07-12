package ru.practice.purchase.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LotRequest(
        @NotBlank(message = "Lot name is required")
        String lotName,
        @NotBlank(message = "Customer code is required")
        String customerCode,
        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", message = "Price must not be negative")
        BigDecimal price,
        @NotBlank(message = "Currency code is required")
        String currencyCode,
        @NotBlank(message = "NDS rate is required")
        String ndsRate,
        String placeDelivery,
        LocalDateTime dateDelivery
) {
}
