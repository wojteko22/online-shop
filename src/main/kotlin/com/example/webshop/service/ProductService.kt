package com.example.webshop.service

import com.example.webshop.entity.Category
import com.example.webshop.entity.Product
import com.example.webshop.entity.Shop
import com.example.webshop.entity.User
import com.example.webshop.entity.dto.CreateProductDto
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

    fun addNewProduct(createProductDto: CreateProductDto, username: String): Long {
        validate(createProductDto, username)
        val product: Product = getProductFromDto(createProductDto)
        val savedProduct = productRepository.save(product)
        return savedProduct.id
    }

    fun getProducts(username: String): List<Product> {
        val user: User? = userRepository.findByEmail(username) ?: throw NoSuchElementException("User doesn't exists!")
        return productRepository.findByShopId(user?.shop?.id!!)
    }

    private fun getProductFromDto(dto: CreateProductDto): Product {
        val shop: Shop = shopRepository.findById(dto.shopId)!!
        val category: Category = categoryRepository.findById(dto.categoryId)
        return Product(dto.name, dto.price, dto.unit, dto.status,
                dto.description, dto.photo, category, shop)
    }

    private fun validate(createProductDto: CreateProductDto, name: String) {
        val user: User = userRepository.findByEmail(name)!!
        if (createProductDto.shopId !== user.shop?.id) {
            throw IllegalStateException("Shop doesn't belong to the user!")
        }
    }
}