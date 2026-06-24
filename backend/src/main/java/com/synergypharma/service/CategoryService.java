package com.synergypharma.service;

import com.synergypharma.dto.CategoryDTO;
import com.synergypharma.entity.Category;
import com.synergypharma.exception.ResourceNotFoundException;
import com.synergypharma.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAllActiveCategories() {
        return categoryRepository.findByActiveTrueOrderByNameAsc().stream().map(this::toDTO).toList();
    }

    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream().map(this::toDTO).toList();
    }

    public CategoryDTO getCategoryById(Long id) {
        return categoryRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
    }

    @Transactional
    public CategoryDTO createCategory(CategoryDTO dto) {
        Category category = Category.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .iconClass(dto.getIconClass())
                .active(dto.isActive())
                .build();
        return toDTO(categoryRepository.save(category));
    }

    @Transactional
    public CategoryDTO updateCategory(Long id, CategoryDTO dto) {
        Category existing = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
        existing.setName(dto.getName());
        existing.setDescription(dto.getDescription());
        existing.setIconClass(dto.getIconClass());
        existing.setActive(dto.isActive());
        return toDTO(categoryRepository.save(existing));
    }

    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category", "id", id);
        }
        categoryRepository.deleteById(id);
    }

    private CategoryDTO toDTO(Category c) {
        return CategoryDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .iconClass(c.getIconClass())
                .active(c.isActive())
                .productCount(c.getProducts() != null ? c.getProducts().size() : 0)
                .build();
    }
}
