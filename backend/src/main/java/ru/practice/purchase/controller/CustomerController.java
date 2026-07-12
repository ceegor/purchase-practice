package ru.practice.purchase.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.practice.purchase.dto.CustomerRequest;
import ru.practice.purchase.dto.CustomerResponse;
import ru.practice.purchase.service.CustomerService;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public List<CustomerResponse> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "customerName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {
        return customerService.findAll(search, sortBy, sortDirection);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerResponse create(@Valid @RequestBody CustomerRequest request) {
        return customerService.create(request);
    }

    @PutMapping("/{customerCode}")
    public CustomerResponse update(
            @PathVariable String customerCode,
            @Valid @RequestBody CustomerRequest request
    ) {
        return customerService.update(customerCode, request);
    }

    @DeleteMapping("/{customerCode}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String customerCode) {
        customerService.delete(customerCode);
    }
}
