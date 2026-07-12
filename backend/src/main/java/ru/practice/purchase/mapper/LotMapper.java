package ru.practice.purchase.mapper;

import org.jooq.Record;
import org.springframework.stereotype.Component;
import ru.practice.purchase.dto.LotResponse;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import static ru.practice.purchase.repository.table.LotTable.*;

@Component
public class LotMapper {

    public LotResponse toResponse(Record record) {
        return new LotResponse(
                record.get(LOT_NAME),
                record.get(CUSTOMER_CODE),
                record.get(PRICE),
                record.get(CURRENCY_CODE),
                record.get(NDS_RATE),
                record.get(PLACE_DELIVERY),
                toLocalDateTime(record.get(DATE_DELIVERY))
        );
    }

    private LocalDateTime toLocalDateTime(Object value) {
        if (value == null) {
            return null;
        }

        if (value instanceof LocalDateTime localDateTime) {
            return localDateTime;
        }

        if (value instanceof Timestamp timestamp) {
            return timestamp.toLocalDateTime();
        }

        throw new IllegalArgumentException("Unsupported date_delivery type: " + value.getClass());
    }
}
