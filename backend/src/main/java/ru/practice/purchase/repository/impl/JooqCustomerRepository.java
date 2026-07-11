package ru.practice.purchase.repository.impl;

import lombok.RequiredArgsConstructor;
import org.jooq.*;
import org.springframework.stereotype.Repository;
import ru.practice.purchase.dto.CustomerRequest;
import ru.practice.purchase.dto.CustomerResponse;
import ru.practice.purchase.mapper.CustomerMapper;
import ru.practice.purchase.repository.CustomerRepository;

import java.util.List;
import java.util.Optional;

import static org.jooq.impl.DSL.*;
import static ru.practice.purchase.repository.table.CustomerTable.*;

@Repository
@RequiredArgsConstructor
public class JooqCustomerRepository implements CustomerRepository {

    private final DSLContext dsl;
    private final CustomerMapper customerMapper;

    @Override
    public List<CustomerResponse> findAll(String search, String sortBy, String sortDirection) {
        return dsl.selectFrom(CUSTOMER)
                .where(searchCondition(search))
                .orderBy(sortField(sortBy, sortDirection))
                .fetch(customerMapper::toResponse);
    }

    @Override
    public Optional<CustomerResponse> findByCode(String customerCode) {
        return dsl.selectFrom(CUSTOMER)
                .where(CUSTOMER_CODE.eq(customerCode))
                .fetchOptional(customerMapper::toResponse);
    }

    @Override
    public CustomerResponse create(CustomerRequest request) {
        return dsl.insertInto(CUSTOMER)
                .set(CUSTOMER_CODE, request.customerCode())
                .set(CUSTOMER_NAME, request.customerName())
                .set(CUSTOMER_INN, request.customerInn())
                .set(CUSTOMER_KPP, request.customerKpp())
                .set(CUSTOMER_LEGAL_ADDRESS, request.customerLegalAddress())
                .set(CUSTOMER_POSTAL_ADDRESS, request.customerPostalAddress())
                .set(CUSTOMER_EMAIL, request.customerEmail())
                .set(CUSTOMER_CODE_MAIN, request.customerCodeMain())
                .set(IS_ORGANIZATION, request.isOrganization())
                .set(IS_PERSON, request.isPerson())
                .returningResult(CUSTOMER.fields())
                .fetchOne(customerMapper::toResponse);
    }

    @Override
    public CustomerResponse update(String customerCode, CustomerRequest request) {
        dsl.update(CUSTOMER)
                .set(CUSTOMER_NAME, request.customerName())
                .set(CUSTOMER_INN, request.customerInn())
                .set(CUSTOMER_KPP, request.customerKpp())
                .set(CUSTOMER_LEGAL_ADDRESS, request.customerLegalAddress())
                .set(CUSTOMER_POSTAL_ADDRESS, request.customerPostalAddress())
                .set(CUSTOMER_EMAIL, request.customerEmail())
                .set(CUSTOMER_CODE_MAIN, request.customerCodeMain())
                .set(IS_ORGANIZATION, request.isOrganization())
                .set(IS_PERSON, request.isPerson())
                .where(CUSTOMER_CODE.eq(customerCode))
                .execute();

        return findByCode(customerCode).orElseThrow();
    }

    @Override
    public void delete(String customerCode) {
        dsl.deleteFrom(CUSTOMER)
                .where(CUSTOMER_CODE.eq(customerCode))
                .execute();
    }

    private Condition searchCondition(String search) {
        if (search == null || search.isBlank()) {
            return trueCondition();
        }

        String pattern = "%" + search.toLowerCase() + "%";

        return lower(CUSTOMER_CODE).like(pattern)
                .or(lower(CUSTOMER_NAME).like(pattern))
                .or(lower(CUSTOMER_INN).like(pattern))
                .or(lower(CUSTOMER_EMAIL).like(pattern));
    }

    private SortField<?> sortField(String sortBy, String sortDirection) {
        Field<?> field = switch (sortBy) {
            case "customerCode" -> CUSTOMER_CODE;
            case "customerInn" -> CUSTOMER_INN;
            case "customerEmail" -> CUSTOMER_EMAIL;
            default -> CUSTOMER_NAME;
        };

        return "desc".equalsIgnoreCase(sortDirection) ? field.desc() : field.asc();
    }
}
