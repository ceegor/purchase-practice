package ru.practice.purchase.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.practice.purchase.dto.CustomerRequest;
import ru.practice.purchase.dto.CustomerResponse;
import ru.practice.purchase.exception.NotFoundException;
import ru.practice.purchase.repository.CustomerRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<CustomerResponse> findAll(String search, String sortBy, String sortDirection) {
        return customerRepository.findAll(search, sortBy, sortDirection);
    }

    public CustomerResponse create(CustomerRequest request) {
        return customerRepository.create(request);
    }

    public CustomerResponse update(String customerCode, CustomerRequest request) {
        customerRepository.findByCode(customerCode)
                .orElseThrow(() -> new NotFoundException("Customer not found: " + customerCode));

        return customerRepository.update(customerCode, request);
    }

    public void delete(String customerCode) {
        customerRepository.findByCode(customerCode)
                .orElseThrow(() -> new NotFoundException("Customer not found: " + customerCode));

        customerRepository.delete(customerCode);
    }
}
