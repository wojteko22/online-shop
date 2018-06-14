package com.example.webshop.service

import com.example.webshop.dto.CreateProductDto
import com.example.webshop.dto.ProductDto
import com.example.webshop.dto.UpdateProductDto
import com.example.webshop.entity.Category
import com.example.webshop.entity.Product
import com.example.webshop.entity.Shop
import com.example.webshop.repository.CategoryRepository
import com.example.webshop.repository.ProductRepository
import com.example.webshop.repository.ShopRepository
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class ProductService(
        private val productRepository: ProductRepository,
        private val shopRepository: ShopRepository,
        private val categoryRepository: CategoryRepository
) {

    fun getProduct(productId: Long, shopId: Long): ProductDto {
        val product = productRepository.findById(productId) ?: productLackError(productId)
        if (product.shop.id != shopId) {
            productLackError(productId)
        }
        return product.toDto()
    }

    fun getProducts(shopId: Long): List<ProductDto> {
        val shop: Shop = shopRepository.findById(shopId)!!
        val products: List<Product> = productRepository.findByShop(shop)
        return products.map { product -> product.toDto() }
    }

    fun getByCategoryId(categoryId: Long, shopId: Long): List<ProductDto> {
        val category = categoryRepository.findById(categoryId)
        if (category == null || category.shop.id != shopId) {
            categoryLackError(categoryId)
        }
        val products = productRepository.findByCategory(category)
        return products.map { it.toDto() }
    }

    fun getByShopIdAndPattern(shopId: Long, pattern: String): List<ProductDto> {
        val shop = shopRepository.findById(shopId) ?: shopLackError(shopId)
        val products = productRepository.findByShopAndPattern(shop, pattern)
        return products.map { product -> product.toDto() }
    }

    fun addNewProduct(createProductDto: CreateProductDto, shopId: Long): Long {
        val product: Product = getProductFromDto(createProductDto, shopId)
        val savedProduct = productRepository.save(product)
        return savedProduct.id
    }

    private fun getProductFromDto(dto: CreateProductDto, shopId: Long): Product {
        val shop = shopRepository.findById(shopId) ?: shopLackError(shopId)
        val categoryId = dto.categoryId
        val category = categoryRepository.findById(categoryId) ?: categoryLackError(categoryId)
        if (category.shop.id != shopId) {
            categoryLackError(categoryId)
        }
        return Product(dto.name, dto.price, dto.unit, dto.status, dto.description, dto.photo, category, shop)
    }

    fun getByCategoryIdPageable(categoryId: Long, page: Int, pageSize: Int): List<ProductDto> {
        val category: Category = categoryRepository.findById(categoryId )!!
        val products = productRepository.findByCategory(category, PageRequest(page, pageSize))
        return products.map { product -> product.toDto() }
    }

    fun getProductsAmountInCategory(categoryId: Long): Any {
        val category: Category = categoryRepository.findById(categoryId)!!
        return productRepository.countByCategory(category)
    }

    private fun shopLackError(shopId: Long): Nothing = throw NoSuchElementException("No shop with id $shopId")

    private fun categoryLackError(categoryId: Long): Nothing =
            throw IllegalArgumentException("No category with id $categoryId")

    fun updateProduct(productId: Long, dto: UpdateProductDto, shopId: Long): Long {
        val product = productRepository.findById(productId) ?: productLackError(productId)
        if (product.shop.id != shopId) {
            productLackError(productId)
        }
        dto.categoryId?.let {
            val category = categoryRepository.findById(it) ?: categoryLackError(it)
            if (category.shop.id != shopId) {
                categoryLackError(it)
            }
            product.category = category
        }
        dto.name?.let {
            product.name = it
        }
        dto.price?.let {
            product.price = it
        }
        dto.unit?.let {
            product.unit = it
        }
        dto.status?.let {
            product.status = it
        }
        dto.description?.let {
            product.description = it
        }
        dto.photo?.let {
            product.photo = it
        }
        val updatedProduct = productRepository.save(product)
        return updatedProduct.id
    }

    fun deleProduct(productId: Long, shopId: Long) {
        val product = productRepository.findById(productId)
        if (product == null || product.shop.id != shopId) {
            productLackError(productId)
        }
        productRepository.delete(productId)
    }

    private fun productLackError(productId: Long): Nothing = throw NoSuchElementException("No product with id $productId")
}
