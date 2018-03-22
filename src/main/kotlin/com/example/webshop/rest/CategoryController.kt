package com.example.webshop.rest

import com.example.webshop.entity.Category
import com.example.webshop.service.CategoryService
import org.springframework.web.bind.annotation.*

@RestController
class CategoryController(private val categoryService: CategoryService) {

    @GetMapping("/categories")
    fun showCategories(): Iterable<Category> {
        return categoryService.findAll()
    }

    @PostMapping("/categories")
    fun addCategory(@RequestBody category: Category, @RequestParam parentCategoryId: String) {
        return categoryService.save(category, parentCategoryId)
    }

    @DeleteMapping("/categories/{id}")
    fun deleteCategory(@PathVariable id: Long) {
        categoryService.deleteById(id)
    }

    @PatchMapping("/categories/{id}")
    fun updateCategory(
            @PathVariable id: Long,
            @RequestParam(required = false) parentCategoryId: String?,
            @RequestParam categoryNewName: String
    ) {
        categoryService.update(id, parentCategoryId, categoryNewName)
    }

}
