package ru.practice.purchase.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.practice.purchase.dto.LotRequest;
import ru.practice.purchase.dto.LotResponse;
import ru.practice.purchase.exception.NotFoundException;
import ru.practice.purchase.repository.LotRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LotService {

    private final LotRepository lotRepository;

    public List<LotResponse> findAll(String search, String sortBy, String sortDirection) {
        return lotRepository.findAll(search, sortBy, sortDirection);
    }

    public LotResponse create(LotRequest request) {
        return lotRepository.create(request);
    }

    public LotResponse update(String lotName, String customerCode, LotRequest request) {
        lotRepository.findByNaturalKey(lotName, customerCode)
                .orElseThrow(() -> new NotFoundException("Lot not found: " + lotName + ", " + customerCode));

        return lotRepository.update(lotName, customerCode, request);
    }

    public void delete(String lotName, String customerCode) {
        lotRepository.findByNaturalKey(lotName, customerCode)
                .orElseThrow(() -> new NotFoundException("Lot not found: " + lotName + ", " + customerCode));

        lotRepository.delete(lotName, customerCode);
    }
}
