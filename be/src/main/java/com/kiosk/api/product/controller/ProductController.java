package com.kiosk.api.product.controller;

import com.kiosk.api.product.controller.dto.ProductCategoryResponse;
import com.kiosk.api.product.controller.dto.ProductDto;
import com.kiosk.api.product.domain.entity.Category;
import com.kiosk.api.product.service.CategoryService;
import com.kiosk.api.product.service.ProductService;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    @GetMapping("/products")
    public List<ProductCategoryResponse> list() {
        List<ProductCategoryResponse> responses = new ArrayList<>();
        List<ProductDto> products = productService.findAll(); // 전체 메뉴
        List<Category> categories = categoryService.findAll(); // 카테고리 정보들
        for (Category category : categories) {
            List<ProductDto> productByCategory = products.stream()
                .filter(product -> product.matchCategoryId(category))
                .collect(Collectors.toUnmodifiableList());
            responses.add(new ProductCategoryResponse(category.getCategoryType().name(),
                category.getId(),
                productByCategory));
        }
        return responses;
    }
}
