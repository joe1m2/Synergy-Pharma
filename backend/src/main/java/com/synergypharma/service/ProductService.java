package com.synergypharma.service;

import com.synergypharma.dto.ProductDTO;
import com.synergypharma.entity.Category;
import com.synergypharma.entity.Manufacturer;
import com.synergypharma.entity.Product;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.CategoryRepository;
import com.synergypharma.repository.ManufacturerRepository;
import com.synergypharma.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ManufacturerRepository manufacturerRepository;

    public Page<ProductDTO> getActiveProducts(Pageable pageable) {
        return productRepository.findByActiveTrue(pageable).map(this::toDTO);
    }

    public Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryIdAndActiveTrue(categoryId, pageable).map(this::toDTO);
    }

    public Page<ProductDTO> searchProducts(String keyword, Pageable pageable) {
        return productRepository.searchByKeyword(keyword, pageable).map(this::toDTO);
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
    }

    public List<ProductDTO> getLatestProducts() {
        return productRepository.findTop6ByActiveTrueOrderByCreatedAtDesc()
                .stream().map(this::toDTO).toList();
    }

    @Transactional
    public ProductDTO createProduct(ProductDTO dto) {
        Product product = fromDTO(dto);
        return toDTO(productRepository.save(product));
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        existing.setName(dto.getName());
        existing.setGenericName(dto.getGenericName());
        existing.setDescription(dto.getDescription());
        existing.setSku(dto.getSku());
        existing.setStrength(dto.getStrength());
        existing.setDosageForm(dto.getDosageForm());
        existing.setPackagingUnit(dto.getPackagingUnit());
        existing.setImageUrl(dto.getImageUrl());
        existing.setBrochureUrl(dto.getBrochureUrl());
        existing.setActive(dto.isActive());
        // Update category if provided
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId()).orElse(null);
            existing.setCategory(category);
        }
        // Update manufacturer if provided
        if (dto.getManufacturerId() != null) {
            Manufacturer manufacturer = manufacturerRepository.findById(dto.getManufacturerId()).orElse(null);
            existing.setManufacturer(manufacturer);
        }
        return toDTO(productRepository.save(existing));
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        productRepository.deleteById(id);
    }

    // ── Mappers ─────────────────────────────────────────────────────────────
    private ProductDTO toDTO(Product p) {
        return ProductDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .genericName(p.getGenericName())
                .description(p.getDescription())
                .sku(p.getSku())
                .strength(p.getStrength())
                .dosageForm(p.getDosageForm())
                .packagingUnit(p.getPackagingUnit())
                .imageUrl(p.getImageUrl())
                .brochureUrl(p.getBrochureUrl())
                .categoryId(p.getCategory() != null ? p.getCategory().getId() : null)
                .categoryName(p.getCategory() != null ? p.getCategory().getName() : null)
                .manufacturerId(p.getManufacturer() != null ? p.getManufacturer().getId() : null)
                .manufacturerName(p.getManufacturer() != null ? p.getManufacturer().getName() : null)
                .active(p.isActive())
                .build();
    }

    private Product fromDTO(ProductDTO dto) {
        Category category = dto.getCategoryId() != null
                ? categoryRepository.findById(dto.getCategoryId()).orElse(null)
                : null;
        Manufacturer manufacturer = dto.getManufacturerId() != null
                ? manufacturerRepository.findById(dto.getManufacturerId()).orElse(null)
                : null;
        return Product.builder()
                .name(dto.getName())
                .genericName(dto.getGenericName())
                .description(dto.getDescription())
                .sku(dto.getSku())
                .strength(dto.getStrength())
                .dosageForm(dto.getDosageForm())
                .packagingUnit(dto.getPackagingUnit())
                .imageUrl(dto.getImageUrl())
                .brochureUrl(dto.getBrochureUrl())
                .active(dto.isActive())
                .category(category)
                .manufacturer(manufacturer)
                .build();
    }
}
