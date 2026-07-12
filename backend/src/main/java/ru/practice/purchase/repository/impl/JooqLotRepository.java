package ru.practice.purchase.repository.impl;

import lombok.RequiredArgsConstructor;
import org.jooq.Condition;
import org.jooq.DSLContext;
import org.jooq.Field;
import org.jooq.SortField;
import org.springframework.stereotype.Repository;
import ru.practice.purchase.dto.LotRequest;
import ru.practice.purchase.dto.LotResponse;
import ru.practice.purchase.mapper.LotMapper;
import ru.practice.purchase.repository.LotRepository;

import java.util.List;
import java.util.Optional;

import static org.jooq.impl.DSL.lower;
import static org.jooq.impl.DSL.trueCondition;
import static ru.practice.purchase.repository.table.LotTable.*;

@Repository
@RequiredArgsConstructor
public class JooqLotRepository implements LotRepository {

    private final DSLContext dsl;
    private final LotMapper lotMapper;

    @Override
    public List<LotResponse> findAll(String search, String sortBy, String sortDirection) {
        return dsl.selectFrom(LOT)
                .where(searchCondition(search))
                .orderBy(sortField(sortBy, sortDirection))
                .fetch(lotMapper::toResponse);
    }

    @Override
    public Optional<LotResponse> findByNaturalKey(String lotName, String customerCode) {
        return dsl.selectFrom(LOT)
                .where(naturalKeyCondition(lotName, customerCode))
                .fetchOptional(lotMapper::toResponse);
    }

    @Override
    public LotResponse create(LotRequest request) {
        dsl.insertInto(LOT)
                .set(LOT_NAME, request.lotName())
                .set(CUSTOMER_CODE, request.customerCode())
                .set(PRICE, request.price())
                .set(CURRENCY_CODE, request.currencyCode())
                .set(NDS_RATE, request.ndsRate())
                .set(PLACE_DELIVERY, request.placeDelivery())
                .set(DATE_DELIVERY, request.dateDelivery())
                .execute();

        return findByNaturalKey(request.lotName(), request.customerCode()).orElseThrow();
    }

    @Override
    public LotResponse update(String lotName, String customerCode, LotRequest request) {
        dsl.update(LOT)
                .set(LOT_NAME, request.lotName())
                .set(CUSTOMER_CODE, request.customerCode())
                .set(PRICE, request.price())
                .set(CURRENCY_CODE, request.currencyCode())
                .set(NDS_RATE, request.ndsRate())
                .set(PLACE_DELIVERY, request.placeDelivery())
                .set(DATE_DELIVERY, request.dateDelivery())
                .where(naturalKeyCondition(lotName, customerCode))
                .execute();

        return findByNaturalKey(request.lotName(), request.customerCode()).orElseThrow();
    }

    @Override
    public void delete(String lotName, String customerCode) {
        dsl.deleteFrom(LOT)
                .where(naturalKeyCondition(lotName, customerCode))
                .execute();
    }

    private Condition naturalKeyCondition(String lotName, String customerCode) {
        return LOT_NAME.eq(lotName)
                .and(CUSTOMER_CODE.eq(customerCode));
    }

    private Condition searchCondition(String search) {
        if (search == null || search.isBlank()) {
            return trueCondition();
        }

        String pattern = "%" + search.toLowerCase() + "%";

        return lower(LOT_NAME).like(pattern)
                .or(lower(CUSTOMER_CODE).like(pattern))
                .or(lower(CURRENCY_CODE).like(pattern))
                .or(lower(NDS_RATE).like(pattern))
                .or(lower(PLACE_DELIVERY).like(pattern));
    }

    private SortField<?> sortField(String sortBy, String sortDirection) {
        Field<?> field = switch (sortBy) {
            case "customerCode" -> CUSTOMER_CODE;
            case "price" -> PRICE;
            case "currencyCode" -> CURRENCY_CODE;
            case "ndsRate" -> NDS_RATE;
            case "dateDelivery" -> DATE_DELIVERY;
            default -> LOT_NAME;
        };

        return "desc".equalsIgnoreCase(sortDirection) ? field.desc() : field.asc();
    }
}
