package com.example.webshop.rest

import com.example.webshop.entity.dto.CreateProductDto
import com.example.webshop.entity.dto.DeleteProductDto
import com.example.webshop.entity.dto.UpdateProductDto
import com.example.webshop.service.ProductService
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

    @PatchMapping
    fun updateProduct(@RequestBody dto: UpdateProductDto, principal: Principal) = productService.updateProduct(dto, principal.name!!)

    @DeleteMapping
    fun deleteProduct(@RequestBody dto: DeleteProductDto, principal: Principal) = productService.deleProduct(dto, principal.name)

    private fun validate(){

    }
}