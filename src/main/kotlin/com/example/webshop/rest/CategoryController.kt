package com.example.webshop.rest

import com.example.webshop.entity.Category
import com.example.webshop.service.CategoryService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class CategoryController(private val categoryService: CategoryService) {

    @GetMapping("/{shop_id}/categories")
    fun showCategories(@PathVariable shop_id: Long) = categoryService.findByShopId(shop_id)

    @PostMapping("{shop_id}/categories")
    fun addCategory(@PathVariable shop_id: Long, @RequestBody category: Category,
                    @RequestParam parentCategoryId: String) {
        categoryService.save(category, parentCategoryId)
    }

    @DeleteMapping("{shop_id}/categories/{id}")
    fun deleteCategory(@PathVariable shop_id: Long, @PathVariable id: Long) {
        categoryService.deleteById(id)
    }

    @PatchMapping("{shop_id}/categories/{id}")
    fun updateCategory(@PathVariable shop_id: Long,
                       @PathVariable id: Long,
                       @RequestParam(required = false) parentCategoryId: String?,
                       @RequestParam categoryNewName: String
    ) {
        categoryService.update(id, parentCategoryId, categoryNewName)
    }
}
