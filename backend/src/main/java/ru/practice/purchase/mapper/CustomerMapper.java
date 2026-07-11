package ru.practice.purchase.mapper;

import org.jooq.Record;
import org.springframework.stereotype.Component;
import ru.practice.purchase.dto.CustomerResponse;

import static ru.practice.purchase.repository.table.CustomerTable.*;

@Component
public class CustomerMapper {

    public CustomerResponse toResponse(Record record) {
        return new CustomerResponse(
                record.get(CUSTOMER_CODE),
                record.get(CUSTOMER_NAME),
                record.get(CUSTOMER_INN),
                record.get(CUSTOMER_KPP),
                record.get(CUSTOMER_LEGAL_ADDRESS),
                record.get(CUSTOMER_POSTAL_ADDRESS),
                record.get(CUSTOMER_EMAIL),
                record.get(CUSTOMER_CODE_MAIN),
                record.get(IS_ORGANIZATION),
                record.get(IS_PERSON)
        );
    }
}
