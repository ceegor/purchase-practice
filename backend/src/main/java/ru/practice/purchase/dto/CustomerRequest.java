package ru.practice.purchase.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CustomerRequest(
        @NotBlank(message = "Customer code is required")
        String customerCode,
        @NotBlank(message = "Customer name is required")
        String customerName,
        String customerInn,
        String customerKpp,
        String customerLegalAddress,
        String customerPostalAddress,
        @Email(message = "Customer email must be valid")
        String customerEmail,
        String customerCodeMain,
        @NotNull(message = "Organization flag is required")
        Boolean isOrganization,
        @NotNull(message = "Person flag is required")
        Boolean isPerson
) {

    @AssertTrue(message = "Exactly one customer type must be selected")
    public boolean isCustomerTypeValid() {
        return Boolean.TRUE.equals(isOrganization) ^ Boolean.TRUE.equals(isPerson);
    }
}
