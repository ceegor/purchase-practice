package ru.practice.purchase.repository.table;

import org.jooq.Field;
import org.jooq.Table;

import static org.jooq.impl.DSL.table;
import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.name;

public final class CustomerTable {

    public static final Table<?> CUSTOMER = table(name("purchase", "customer"));

    public static final Field<String> CUSTOMER_CODE = field(name("customer_code"), String.class);
    public static final Field<String> CUSTOMER_NAME = field(name("customer_name"), String.class);
    public static final Field<String> CUSTOMER_INN = field(name("customer_inn"), String.class);
    public static final Field<String> CUSTOMER_KPP = field(name("customer_kpp"), String.class);
    public static final Field<String> CUSTOMER_LEGAL_ADDRESS = field(name("customer_legal_address"), String.class);
    public static final Field<String> CUSTOMER_POSTAL_ADDRESS = field(name("customer_postal_address"), String.class);
    public static final Field<String> CUSTOMER_EMAIL = field(name("customer_email"), String.class);
    public static final Field<String> CUSTOMER_CODE_MAIN = field(name("customer_code_main"), String.class);
    public static final Field<Boolean> IS_ORGANIZATION = field(name("is_organization"), Boolean.class);
    public static final Field<Boolean> IS_PERSON = field(name("is_person"), Boolean.class);

    private CustomerTable() {
    }
}
