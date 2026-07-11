package ru.practice.purchase.dto;

public record CustomerResponse(
        String customerCode,
        String customerName,
        String customerInn,
        String customerKpp,
        String customerLegalAddress,
        String customerPostalAddress,
        String customerEmail,
        String customerCodeMain,
        Boolean isOrganization,
        Boolean isPerson
) {
}
