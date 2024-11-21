package com.project.harmonie_e_commerce.service;


import com.project.harmonie_e_commerce.dto.CategoryDTO;
import com.project.harmonie_e_commerce.exception.DataNotFoundException;
import com.project.harmonie_e_commerce.model.Category;
import com.project.harmonie_e_commerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() throws DataNotFoundException{
        List<Category> categories = categoryRepository.findAll();
        if (categories.isEmpty()) {
            throw new DataNotFoundException("No categories found.");
        }
        return categories;
    }


    @Override
    public Category getCategoryById(Long id) throws DataNotFoundException {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Category not found"));
    }

    @Override
    public Category createCategory(CategoryDTO category){
        return categoryRepository.save(Category.builder()
                .name(category.getName())
                .build());
    }

    @Override
    public Category updateCategory(Long id, CategoryDTO categoryDTO) throws Exception{
        Category existingCategory = getCategoryById(id);
        existingCategory.setName(categoryDTO.getName());
        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}
