package com.example.webshop.rest

import com.example.webshop.entity.Category
import com.example.webshop.service.CategoryService
import org.apache.logging.log4j.LogManager
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class CategoryController(private val categoryService: CategoryService) {
    companion object {
        private val logger = LogManager.getLogger()
    }

    @GetMapping("/categories")
    fun showCategories(): Iterable<Category> {
        return categoryService.findAll()
    }

    @PostMapping("/categories")
    fun addCategory(@RequestBody category: Category, @RequestParam parentCategoryId: String) {
        return categoryService.save(category, parentCategoryId)
    }

    @DeleteMapping("/categories/{id}")
    fun deleteCategory(@PathVariable id: Long): ResponseEntity<Any> {
        return categoryService.deleteById(id)
    }

    @PatchMapping("/categories/{id}")
    fun updateCategory(
            @PathVariable id: Long,
            @RequestParam(required = false) parentCategoryId: String,
            @RequestParam categoryNewName: String
    ): ResponseEntity<Any> {
        return categoryService.update(id, parentCategoryId, categoryNewName)
    }

}
