package ru.practice.purchase.repository.table;

import org.jooq.Field;
import org.jooq.Table;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.jooq.impl.DSL.field;
import static org.jooq.impl.DSL.table;
import static org.jooq.impl.DSL.name;

public final class LotTable {

    public static final Table<?> LOT = table(name("purchase", "lot"));

    public static final Field<String> LOT_NAME = field(name("lot_name"), String.class);
    public static final Field<String> CUSTOMER_CODE = field(name("customer_code"), String.class);
    public static final Field<BigDecimal> PRICE = field(name("price"), BigDecimal.class);
    public static final Field<String> CURRENCY_CODE = field(name("currency_code"), String.class);
    public static final Field<String> NDS_RATE = field(name("nds_rate"), String.class);
    public static final Field<String> PLACE_DELIVERY = field(name("place_delivery"), String.class);
    public static final Field<LocalDateTime> DATE_DELIVERY = field(name("date_delivery"), LocalDateTime.class);

    private LotTable() {
    }
}
