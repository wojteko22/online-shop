package com.example.webshop.rest

import com.example.webshop.dto.CreateProductDto
import com.example.webshop.dto.UpdateProductDto
import com.example.webshop.security.Guard
import com.example.webshop.service.ProductService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*

@RestController
// todo: Dodać @RequestMapping()
class ProductController(private val productService: ProductService, private val guard: Guard) {

    @GetMapping("/shops/{shopId}/products")
    fun getProducts(@PathVariable shopId: Long) = productService.getProducts(shopId)

    @GetMapping("/shops/{shopId}/products/{productId}")
    fun getProduct(@PathVariable shopId: Long, @PathVariable productId: Long) = productService.getProduct(productId, shopId)

    @PostMapping("/shops/{shopId}/products")
    fun addProduct(@PathVariable shopId: Long, @RequestBody dto: CreateProductDto, auth: OAuth2Authentication): Long {
        guard.checkShopId(shopId, auth)
        return productService.addNewProduct(dto, shopId)
    }

    @PatchMapping("/shops/{shopId}/products/{productId}")
    fun updateProduct(
            @PathVariable shopId: Long,
            @PathVariable productId: Long,
            @RequestBody dto: UpdateProductDto,
            auth: OAuth2Authentication
    ): Long {
        guard.checkShopId(shopId, auth)
        return productService.updateProduct(productId, dto, shopId)
    }

    @DeleteMapping("/shops/{shopId}/products/{productId}")
    fun deleteProduct(
            @PathVariable shopId: Long,
            @PathVariable productId: Long,
            auth: OAuth2Authentication
    ) {
        guard.checkShopId(shopId, auth)
        productService.deleProduct(productId, shopId)
    }


    @GetMapping("/shops/{shopId}/products/category/{categoryId}")
    fun getProductsByCategoryId(@PathVariable shopId: Long, @PathVariable categoryId: Long) =
            productService.getByCategoryId(categoryId, shopId)

    @GetMapping("/products/shop/{shopId}/pattern/{pattern}")
    fun getProductsByPattern(@PathVariable shopId: Long, @PathVariable pattern: String) = productService.getByShopIdAndPattern(shopId, pattern)

}