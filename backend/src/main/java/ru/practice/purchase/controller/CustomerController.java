package ru.practice.purchase.controller;

import org.jooq.DSLContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.practice.purchase.dto.CustomerResponse;

import java.util.List;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;
import static org.jooq.impl.DSL.name;

@RestController
public class CustomerController {

    private final DSLContext dsl;

    public CustomerController(DSLContext dsl) {
        this.dsl = dsl;
    }

    @GetMapping("/api/customers")
    public List<CustomerResponse> getCustomers() {
        return dsl
                .select(
                        field(name("customer_code"), String.class),
                        field(name("customer_name"), String.class),
                        field(name("customer_inn"), String.class),
                        field(name("customer_kpp"), String.class),
                        field(name("customer_legal_address"), String.class),
                        field(name("customer_postal_address"), String.class),
                        field(name("customer_email"), String.class),
                        field(name("customer_code_main"), String.class),
                        field(name("is_organization"), Boolean.class),
                        field(name("is_person"), Boolean.class)
                )
                .from(table(name("purchase", "customer")))
                .fetch(record -> new CustomerResponse(
                        record.get(field(name("customer_code"), String.class)),
                        record.get(field(name("customer_name"), String.class)),
                        record.get(field(name("customer_inn"), String.class)),
                        record.get(field(name("customer_kpp"), String.class)),
                        record.get(field(name("customer_legal_address"), String.class)),
                        record.get(field(name("customer_postal_address"), String.class)),
                        record.get(field(name("customer_email"), String.class)),
                        record.get(field(name("customer_code_main"), String.class)),
                        record.get(field(name("is_organization"), Boolean.class)),
                        record.get(field(name("is_person"), Boolean.class))
                ));
    }
}
