package com.project.harmonie_e_commerce.service;


import com.project.harmonie_e_commerce.dto.CategoryDTO;
import com.project.harmonie_e_commerce.model.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories() throws Exception;
    Category getCategoryById(Long id) throws Exception;
    Category createCategory(CategoryDTO categoryDTO) throws Exception;
    Category updateCategory(Long id, CategoryDTO categoryDTO) throws Exception;
    void deleteCategory(Long id);
}
