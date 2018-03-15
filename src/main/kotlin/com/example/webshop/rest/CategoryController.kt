package com.example.webshop.rest

import com.example.webshop.entity.Category
import com.example.webshop.repository.CategoryRepository
import org.springframework.web.bind.annotation.*
import org.apache.logging.log4j.LogManager
import javax.servlet.http.HttpServletRequest

@RestController
class CategoryController(private val categoryRepository: CategoryRepository) {
    companion object {
        private val logger = LogManager.getLogger()
    }

    @GetMapping("/categories") // todo: /categories bym wypieprzył na górę, analogicznie jest w ShopRepository
    fun showCategories(): Iterable<Category> {
        return categoryRepository.findByParentCategoryIsNull()!!
    }

    @PutMapping("/categories") // todo: Post raczej, put jest, żeby coś wstawić pod wskazany adres
    fun addCategory(@RequestBody category: Category, request: HttpServletRequest) {
        // todo: Czemu nie RequestParam?
        val parentCategoryId = request.getParameter("parentCategoryId")
        // todo: Nie lepiej w ogóle byłoby wypieprzyć całej tej logiki do nowej warstwy serwisów?
        if (!parentCategoryId.isEmpty()) {
            val parentCategory: Category = categoryRepository.getOne(parentCategoryId.toLong())
            category.parentCategory = parentCategory
        }
        categoryRepository.save(category)
    }

    @DeleteMapping("/categories") // todo: W ścieżce dać {id} + w metodzie @PathVariable
    fun deleteCategory(request: HttpServletRequest) {
        val category: Category = categoryRepository.findById(request.getParameter("categoryId").toLong()).get()
        if (category.subcategories == null || category.subcategories!!.isEmpty()) {
            categoryRepository.delete(category)
        } else {
            // todo: Tu trzeba rzucić jakieś 409 czy coś
            logger.error("Someone is trying to delete category with subcategories")
        }
    }

    @PatchMapping("/categories") // todo: @PathVariable, @RequestParams
    fun updateCategory(request: HttpServletRequest) {
        val category: Category = categoryRepository.findById(request.getParameter("categoryId").toLong()).get()
        val parentCategoryId = request.getParameter("parentCategoryId")
        val newName = request.getParameter("categoryNewName")
        var parent: Category? = null
        if (!parentCategoryId.isEmpty()) {
            parent = categoryRepository.findById(parentCategoryId.toLong()).get()
        }
        if (category.parentCategory == parent) {
            logger.error("Cannot insert category in parent place")
        } else {
            category.name = newName
            category.parentCategory = parent
            categoryRepository.save(category)
        }
    }
}
