package com.example.webshop.rest

import com.example.webshop.dto.CreateProductDto
import com.example.webshop.dto.DeleteProductDto
import com.example.webshop.dto.UpdateProductDto
import com.example.webshop.security.Guard
import com.example.webshop.service.ProductService
import org.springframework.security.oauth2.provider.OAuth2Authentication
import org.springframework.web.bind.annotation.*
import java.security.Principal

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