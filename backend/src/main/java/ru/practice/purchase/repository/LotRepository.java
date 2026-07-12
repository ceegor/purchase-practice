package ru.practice.purchase.repository;

import ru.practice.purchase.dto.LotRequest;
import ru.practice.purchase.dto.LotResponse;

import java.util.List;
import java.util.Optional;

public interface LotRepository {

    List<LotResponse> findAll(String search, String sortBy, String sortDirection);

    Optional<LotResponse> findByNaturalKey(String lotName, String customerCode);

    LotResponse create(LotRequest request);

    LotResponse update(String lotName, String customerCode, LotRequest request);

    void delete(String lotName, String customerCode);
}
