package com.example.webshop.rest

import com.example.webshop.dto.CreateProductDto
import com.example.webshop.dto.DeleteProductDto
import com.example.webshop.dto.UpdateProductDto
import com.example.webshop.service.ProductService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/products")
class ProductController(private val productService: ProductService) {

    @GetMapping("/shop/{shopId}")
    fun getProducts(@PathVariable shopId: Long) = productService.getProducts(shopId)

    @GetMapping("/{productId}")
    fun getProduct(@PathVariable productId: Long) = productService.getProduct(productId)

    @PostMapping
    fun addProduct(@RequestBody dto: CreateProductDto, principal: Principal) = productService.addNewProduct(dto, principal.name!!)

    @PatchMapping("/{productId}")
    fun updateProduct(@PathVariable productId: Long, @RequestBody dto: UpdateProductDto, user: OAuth2Authentication) =
            productService.updateProduct(productId, dto, user.name)

    @DeleteMapping
    fun deleteProduct(@RequestBody dto: DeleteProductDto, principal: Principal) = productService.deleProduct(dto, principal.name)

    @GetMapping("/category/{categoryId}")
    fun getProductsByCategoryId(@PathVariable categoryId: Long) = productService.getByCategoryId(categoryId)

    @GetMapping("shop/{shopId}/pattern/{pattern}")
    fun getProductsByPattern(@PathVariable shopId: Long, @PathVariable pattern: String) = productService.getByShopIdAndPattern(shopId, pattern)

}