package com.example.webshop.service

import com.example.webshop.entity.Category
import com.example.webshop.entity.Product
import com.example.webshop.entity.Shop
import com.example.webshop.entity.dto.CreateProductDto
import com.example.webshop.repository.CategoryRepository
import com.example.webshop.repository.ProductRepository
import com.example.webshop.repository.ShopRepository
import org.springframework.stereotype.Service

@Service
class ProductService(
        private val productRepository: ProductRepository,
        private val shopRepository: ShopRepository,
        private val categoryRepository: CategoryRepository
) {

    fun addNewProduct(createProductDto: CreateProductDto, email: String): Long {
        validate(createProductDto, email)
        val product: Product = getProductFromDto(createProductDto)
        val savedProduct = productRepository.save(product)
        return savedProduct.id
    }

    fun getProducts(email: String): List<Product> {
        val shop = shopRepository.getByUserEmail(email)
        return productRepository.findByShop(shop)
    }

    private fun getProductFromDto(dto: CreateProductDto): Product {
        val shop: Shop = shopRepository.findById(dto.shopId)!!
        val category: Category = categoryRepository.findById(dto.categoryId)
                ?: throw IllegalArgumentException("No category with id ${dto.categoryId}")
        return Product(dto.name, dto.price, dto.unit, dto.status,
                dto.description, dto.photo, category, shop)
    }

    private fun validate(createProductDto: CreateProductDto, email: String) {
        val shop = shopRepository.getByUserEmail(email)
        if (createProductDto.shopId != shop.id) {
            throw IllegalStateException("Shop doesn't belong to the user!")
        }
    }
}
