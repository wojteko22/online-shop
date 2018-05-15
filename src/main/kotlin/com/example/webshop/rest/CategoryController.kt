package com.example.webshop.rest

import com.example.webshop.dto.CreateCategoryDto
import com.example.webshop.dto.UpdateCategoryDto
import com.example.webshop.security.Guard
import com.example.webshop.service.CategoryService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/shops/{shopId}/categories")
class CategoryController(private val categoryService: CategoryService, private val guard: Guard) {

    @GetMapping
    fun showCategories(@PathVariable shopId: Long) = categoryService.findByShopId(shopId)

    @GetMapping("/{categoryId}/subcategories")
    fun getSubcategories(@PathVariable categoryId: Long) =
            categoryService.findSubcategoriesByCategoryId(categoryId)

    @PostMapping
    fun addCategory(@PathVariable shopId: Long, @RequestBody dto: CreateCategoryDto, auth: OAuth2Authentication) {
        guard.checkShopId(shopId, auth)
        categoryService.save(dto)
    }

    @DeleteMapping("/{categoryId}")
    fun deleteCategory(@PathVariable shopId: Long, @PathVariable categoryId: Long, auth: OAuth2Authentication) {
        guard.checkShopId(shopId, auth)
        categoryService.deleteById(categoryId)
    }

    @PatchMapping("/{categoryId}")
    fun updateCategory(
            @PathVariable shopId: Long,
            @PathVariable categoryId: Long,
            @RequestBody dto: UpdateCategoryDto,
            auth: OAuth2Authentication
    ) {
        guard.checkShopId(shopId, auth)
        categoryService.update(categoryId, dto)
    }
}
