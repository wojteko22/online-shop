package com.example.webshop.rest

import com.example.webshop.dto.CreateCategoryDto
import com.example.webshop.dto.UpdateCategoryDto
import com.example.webshop.service.CategoryService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/shops/{shop_id}/categories")
class CategoryController(private val categoryService: CategoryService) {

    @GetMapping
    fun showCategories(@PathVariable shop_id: Long) = categoryService.findByShopId(shop_id)

    @GetMapping("/{category_id}/subcategories")
    fun getSubcategories(@PathVariable category_id: Long) =
            categoryService.findSubcategoriesByCategoryId(category_id)

    @PostMapping
    fun addCategory(@RequestBody createCategoryDto: CreateCategoryDto) {
        categoryService.save(createCategoryDto)
    }

    @DeleteMapping("/{id}")
    fun deleteCategory(@PathVariable shop_id: Long, @PathVariable id: Long) {
        categoryService.deleteById(id)
    }

    @PatchMapping("/{id}")
    fun updateCategory(@PathVariable shop_id: Long, @PathVariable id: Long, @RequestBody dto: UpdateCategoryDto) {
        categoryService.update(id, dto)
    }
}
