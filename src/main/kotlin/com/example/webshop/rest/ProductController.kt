package com.example.webshop.rest

import com.example.webshop.dto.CreateProductDto
import com.example.webshop.dto.UpdateProductDto
import com.example.webshop.security.Guard
import com.example.webshop.service.ProductService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/shops/{shopId}/products")
class ProductController(private val productService: ProductService, private val guard: Guard) {

    @GetMapping
    fun getProducts(@PathVariable shopId: Long) = productService.getProducts(shopId)

    @GetMapping("/{productId}")
    fun getProduct(@PathVariable shopId: Long, @PathVariable productId: Long) = productService.getProduct(productId, shopId)

    @PostMapping
    fun addProduct(@PathVariable shopId: Long, @RequestBody dto: CreateProductDto, auth: OAuth2Authentication): Long {
        guard.checkShopId(shopId, auth)
        return productService.addNewProduct(dto, shopId)
    }

    @PatchMapping("/{productId}")
    fun updateProduct(
            @PathVariable shopId: Long,
            @PathVariable productId: Long,
            @RequestBody dto: UpdateProductDto,
            auth: OAuth2Authentication
    ): Long {
        guard.checkShopId(shopId, auth)
        return productService.updateProduct(productId, dto, shopId)
    }

    @DeleteMapping("/{productId}")
    fun deleteProduct(
            @PathVariable shopId: Long,
            @PathVariable productId: Long,
            auth: OAuth2Authentication
    ) {
        guard.checkShopId(shopId, auth)
        productService.deleProduct(productId, shopId)
    }

    @GetMapping("/category/{categoryId}")
    fun getProductsByCategoryId(@PathVariable shopId: Long, @PathVariable categoryId: Long) =
            productService.getByCategoryId(categoryId, shopId)

    @GetMapping("/pattern/{pattern}")
    fun getProductsByPattern(@PathVariable shopId: Long, @PathVariable pattern: String) =
            productService.getByShopIdAndPattern(shopId, pattern)
}
