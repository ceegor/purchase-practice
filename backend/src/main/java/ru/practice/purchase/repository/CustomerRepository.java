package ru.practice.purchase.repository;

import ru.practice.purchase.dto.CustomerRequest;
import ru.practice.purchase.dto.CustomerResponse;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository {

    List<CustomerResponse> findAll(String search, String sortBy, String sortDirection);

    Optional<CustomerResponse> findByCode(String customerCode);

    CustomerResponse create(CustomerRequest request);

    CustomerResponse update(String customerCode, CustomerRequest request);

    void delete(String customerCode);
}
