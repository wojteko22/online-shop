package com.example.webshop.rest

import com.example.webshop.entity.Category
import com.example.webshop.service.CategoryService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/categories")
class CategoryController(private val categoryService: CategoryService) {

    @GetMapping
    fun showCategories() = categoryService.findAll()

    @PostMapping
    fun addCategory(@RequestBody category: Category, @RequestParam parentCategoryId: String) {
        categoryService.save(category, parentCategoryId)
    }

    @DeleteMapping("/{id}")
    fun deleteCategory(@PathVariable id: Long) {
        categoryService.deleteById(id)
    }

    @PatchMapping("/{id}")
    fun updateCategory(
            @PathVariable id: Long,
            @RequestParam(required = false) parentCategoryId: String?,
            @RequestParam categoryNewName: String
    ) {
        categoryService.update(id, parentCategoryId, categoryNewName)
    }
}
