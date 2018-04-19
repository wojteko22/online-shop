package com.example.webshop.service

import com.example.webshop.entity.Category
import com.example.webshop.entity.Product
import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import com.example.webshop.entity.dto.CreateProductDto
import com.example.webshop.entity.dto.DeleteProductDto
import com.example.webshop.entity.dto.ProductDto
import com.example.webshop.entity.dto.UpdateProductDto
import com.example.webshop.repository.CategoryRepository
import com.example.webshop.repository.ProductRepository
import com.example.webshop.repository.ShopRepository
import com.example.webshop.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class ProductService(private val productRepository: ProductRepository,
                     private val shopRepository: ShopRepository,
                     private val categoryRepository: CategoryRepository,
                     private val userRepository: UserRepository) {

    fun getProducts(shopId: Long): List<ProductDto> {
        val shop: Shop = shopRepository.findById(shopId)!!
        val products: List<Product> = productRepository.findByShop(shop)
        return products.map { product -> product.toDto() }
    }

    fun getProduct(productId: Long): ProductDto {
        return productRepository.findById(productId)!!.toDto()
    }

    fun addNewProduct(createProductDto: CreateProductDto, username: String): Long {
        validate(createProductDto, username)
        val product: Product = getProductFromDto(createProductDto)
        val savedProduct = productRepository.save(product)
        return savedProduct.id
    }

    fun updateProduct(dto: UpdateProductDto, email: String): Long {
        validate(dto, email)
        val product: Product = productRepository.findById(dto.id)!!

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

    fun deleProduct(dto: DeleteProductDto, email: String) {
        validate(dto, email)
        return productRepository.delete(dto.id)
    }

    fun getProducts(email: String): List<Product> {
        val user: User? = userRepository.findByEmail(email)
        val shop = shopRepository.findByUser(user!!)
                ?: throw NoSuchElementException("No shop owned by user with email $email")
        return productRepository.findByShop(shop)
    }

    private fun getProductFromDto(dto: CreateProductDto): Product {
        val shop: Shop = shopRepository.findById(dto.shopId)!!
        val category: Category = categoryRepository.findById(dto.categoryId)!!
        return Product(dto.name, dto.price, dto.unit, dto.status,
                dto.description, dto.photo, category, shop)
    }

    private fun validate(dto: CreateProductDto, email: String) {
        val user: User? = userRepository.findByEmail(email)
        val shop: Shop? = shopRepository.findByUser(user!!)
        if (user == null || dto.shopId != shop?.id) {
            throw IllegalStateException("Shop doesn't belong to the user!")
        }
    }

    private fun validate(dto: UpdateProductDto, email: String) {
        val user: User = userRepository.findByEmail(email)!!
        val product: Product? = productRepository.findById(dto.id)
        if (product == null) {
            throw IllegalStateException("Product doesn't exists!")
        }
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
