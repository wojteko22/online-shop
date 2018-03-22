package com.example.webshop.service

import com.example.webshop.entity.Category
import com.example.webshop.repository.CategoryRepository
import org.apache.logging.log4j.LogManager
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class CategoryService(private val categoryRepository: CategoryRepository) {
    companion object {
        private val logger = LogManager.getLogger()
    }

    fun findAll(): Iterable<Category> {
        return categoryRepository.findByParentCategoryIsNull()
    }

    fun save(category: Category, parentCategoryId: String) {
        if (!parentCategoryId.isEmpty()) {
            val parentCategory: Category = categoryRepository.getOne(parentCategoryId.toLong())
            category.parentCategory = parentCategory
        }
        categoryRepository.save(category)
    }

    fun deleteById(id: Long) {
        val category: Category = categoryRepository.findById(id).get()
        if (category.subcategories.isNotEmpty()) {
            error("Cannot delete category with subcategories")
        }
        categoryRepository.delete(category)
    }

    fun update(id: Long, parentCategoryId: String, categoryNewName: String) {
        val category: Category = categoryRepository.findById(id).get()
        val forbiddenCategories: Set<Category> = getForbiddenParentCategories(category)
        var newParent: Category? = null
        if (!parentCategoryId.isEmpty()) {
            newParent = categoryRepository.findById(parentCategoryId.toLong()).get()
            if (forbiddenCategories.contains(newParent)) {
                error("Cannot set parent category to subcategory")
            }
        }
        category.name = categoryNewName
        category.parentCategory = newParent
        categoryRepository.save(category)
    }

    private fun getForbiddenParentCategories(category: Category): Set<Category> {
        val forbiddenParentCategories: MutableSet<Category> = mutableSetOf()
        for (c in category.subcategories) {
            forbiddenParentCategories.add(c)
            forbiddenParentCategories.addAll(getForbiddenParentCategories(c))
        }
        return forbiddenParentCategories
    }

}