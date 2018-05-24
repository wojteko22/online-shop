package com.example.webshop.rest

import com.example.webshop.dto.CreateProductDto
import com.example.webshop.dto.DeleteProductDto
import com.example.webshop.dto.UpdateProductDto
import com.example.webshop.service.ProductService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
// todo: Dodać @RequestMapping()
class ProductController(private val productService: ProductService) {

    @GetMapping("/shops/{shopId}/products")
    fun getProducts(@PathVariable shopId: Long) = productService.getProducts(shopId)

    @GetMapping("/products/{productId}")
    fun getProduct(@PathVariable productId: Long) = productService.getProduct(productId)

    @PostMapping("/products")
    fun addProduct(@RequestBody dto: CreateProductDto, principal: Principal) = productService.addNewProduct(dto, principal.name!!)

    @PatchMapping("/products/{productId}")
    fun updateProduct(@PathVariable productId: Long, @RequestBody dto: UpdateProductDto, user: OAuth2Authentication) =
            productService.updateProduct(productId, dto, user.name)

    @DeleteMapping("/products")
    fun deleteProduct(@RequestBody dto: DeleteProductDto, principal: Principal) = productService.deleProduct(dto, principal.name)

    @GetMapping("/products/category/{categoryId}")
    fun getProductsByCategoryId(@PathVariable categoryId: Long) = productService.getByCategoryId(categoryId)

    @GetMapping("/products/shop/{shopId}/pattern/{pattern}")
    fun getProductsByPattern(@PathVariable shopId: Long, @PathVariable pattern: String) = productService.getByShopIdAndPattern(shopId, pattern)

}