package com.synergypharma.controller;

import com.synergypharma.dto.ProductDTO;
import com.synergypharma.service.FileStorageService;
import com.synergypharma.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final FileStorageService fileStorageService;

    /**
     * GET /api/products?page=0&size=12&sort=name
     * Public — paginated list of active products.
     */
    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "name") String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return ResponseEntity.ok(productService.getActiveProducts(pageable));
    }

    /**
     * GET /api/products/latest
     * Public — top 6 newest products for the homepage.
     */
    @GetMapping("/latest")
    public ResponseEntity<List<ProductDTO>> getLatest() {
        return ResponseEntity.ok(productService.getLatestProducts());
    }

    /**
     * GET /api/products/search?keyword=aspirin
     * Public — keyword search across name and generic name.
     */
    @GetMapping("/search")
    public ResponseEntity<Page<ProductDTO>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(productService.searchProducts(keyword, pageable));
    }

    /**
     * GET /api/products/category/{categoryId}
     * Public — products filtered by category.
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<ProductDTO>> getByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId, pageable));
    }

    /**
     * GET /api/products/{id}
     * Public — single product detail.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // ── Admin Endpoints ────────────────────────────────────────────────────────

    /**
     * POST /api/products
     * Admin — create a new product.
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> create(@Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.status(201).body(productService.createProduct(dto));
    }

    /**
     * PUT /api/products/{id}
     * Admin — update product details.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> update(@PathVariable Long id, @Valid @RequestBody ProductDTO dto) {
        return ResponseEntity.ok(productService.updateProduct(id, dto));
    }

    /**
     * DELETE /api/products/{id}
     * Admin — delete a product.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/products/{id}/image
     * Admin — upload a product image.
     */
    @PostMapping("/{id}/image")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> uploadImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        ProductDTO product = productService.getProductById(id);
        String imageUrl = fileStorageService.storeFile(file, "products");
        product.setImageUrl(imageUrl);
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    /**
     * POST /api/products/{id}/brochure
     * Admin — upload a product brochure (PDF).
     */
    @PostMapping("/{id}/brochure")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDTO> uploadBrochure(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        ProductDTO product = productService.getProductById(id);
        String brochureUrl = fileStorageService.storeFile(file, "brochures");
        product.setBrochureUrl(brochureUrl);
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }
}
