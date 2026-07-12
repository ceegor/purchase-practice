package ru.practice.purchase.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import ru.practice.purchase.dto.LotRequest;
import ru.practice.purchase.dto.LotResponse;
import ru.practice.purchase.service.LotService;

import java.util.List;

@RestController
@RequestMapping("/api/lots")
@RequiredArgsConstructor
public class LotController {

    private final LotService lotService;

    @GetMapping
    public List<LotResponse> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "lotName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection
    ) {
        return lotService.findAll(search, sortBy, sortDirection);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LotResponse create(@RequestBody LotRequest request) {
        return lotService.create(request);
    }

    @PutMapping
    public LotResponse update(
            @RequestParam String lotName,
            @RequestParam String customerCode,
            @RequestBody LotRequest request
    ) {
        return lotService.update(lotName, customerCode, request);
    }

    @DeleteMapping
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @RequestParam String lotName,
            @RequestParam String customerCode
    ) {
        lotService.delete(lotName, customerCode);
    }
}
