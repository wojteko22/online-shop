package com.example.webshop.service

import com.example.webshop.dto.CreateProductDto
import com.example.webshop.dto.DeleteProductDto
import com.example.webshop.dto.ProductDto
import com.example.webshop.dto.UpdateProductDto
import com.example.webshop.entity.*
import com.example.webshop.repository.CategoryRepository
import com.example.webshop.repository.ProductRepository
import com.example.webshop.repository.ShopRepository
import com.example.webshop.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository,
                     private val shopRepository: ShopRepository,
                     private val categoryRepository: CategoryRepository,
                     private val userRepository: UserRepository
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

    fun getByCategoryId(categoryId: Long): List<ProductDto> {
        val category: Category? = categoryRepository.findById(categoryId)
        val products: List<Product> = productRepository.findByCategory(category!!)
        return products.map { product -> product.toDto() }
    }

    fun getByShopIdAndPattern(shopId: Long, pattern: String): Any {
        val shop: Shop = shopRepository.findOne(shopId)
        val products: List<Product> = this.productRepository.findByShopAndPattern(shop, pattern)
        return products.map { product -> product.toDto() }
    }

    fun addNewProduct(createProductDto: CreateProductDto, shopId: Long): Long {
        val product: Product = getProductFromDto(createProductDto, shopId)
        val savedProduct = productRepository.save(product)
        return savedProduct.id
    }

    private fun getProductFromDto(dto: CreateProductDto, shopId: Long): Product {
        val shop = shopRepository.findById(shopId) ?: throw NoSuchElementException("No shop with id $shopId")
        val categoryId = dto.categoryId
        val category = categoryRepository.findById(categoryId) ?: categoryLackError(categoryId)
        if (category.shop.id != shopId) {
            categoryLackError(categoryId)
        }
        return Product(dto.name, dto.price, dto.unit, dto.status, dto.description, dto.photo, category, shop)
    }

    private fun categoryLackError(categoryId: Long): Nothing =
            throw IllegalArgumentException("No category with id $categoryId")

    fun updateProduct(id: Long, dto: UpdateProductDto, email: String): Long {
        val product = productRepository.findById(id) ?: productLackError(id)

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
        dto.categoryId?.let {
            product.category = categoryRepository.findById(dto.categoryId)!!
        }

        val updatedProduct = productRepository.save(product)
        return updatedProduct.id
    }

    private fun productLackError(productId: Long): Nothing = throw NoSuchElementException("No product with id $productId")

    fun deleProduct(dto: DeleteProductDto, email: String) {
        validate(dto, email)
        return productRepository.delete(dto.id)
    }

    private fun validate(dto: DeleteProductDto, email: String) {
        val user: User = userRepository.findByEmail(email)!!
        val shop: Shop = shopRepository.findByUser(user)!!
        val product: Product? = productRepository.findById(dto.id)
        if (product == null || product.shop.id != shop.id) {
            throw IllegalStateException("Product doesn't exists!")
        }
    }
}
