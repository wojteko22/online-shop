package com.example.webshop.rest

import com.example.webshop.entity.dto.CreateCategoryDto
import com.example.webshop.service.CategoryService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping
class CategoryController(private val categoryService: CategoryService) {

    @GetMapping("/{shop_id}/categories")
    fun showCategories(@PathVariable shop_id: Long) = categoryService.findByShopId(shop_id)

    @PostMapping("{shop_id}/categories")
    fun addCategory(@RequestBody createCategoryDto: CreateCategoryDto) {
        categoryService.save(createCategoryDto)
    }

    @DeleteMapping("{shop_id}/categories/{id}")
    fun deleteCategory(@PathVariable shop_id: Long, @PathVariable id: Long) {
        categoryService.deleteById(id)
    }

    @PostMapping("{shop_id}/categories/{id}")
    fun updateCategory(@PathVariable shop_id: Long,
                       @PathVariable id: Long,
                       @RequestParam(required = false) parentCategoryId: String?,
                       @RequestParam categoryNewName: String
    ) {
        categoryService.update(id, parentCategoryId, categoryNewName)
    }
}
