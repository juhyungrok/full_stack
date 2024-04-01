package com.kiosk.api.product.service;

import com.kiosk.api.product.controller.dto.ProductDto;
import com.kiosk.api.product.domain.repository.ProductRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDto> findAll() {
        return productRepository.findAll()
            .stream()
            .map(ProductDto::new)
            .collect(Collectors.toUnmodifiableList());
    }

    public Long save(final ProductDto productDto) {
        return productRepository.save(productDto);
    }
}
