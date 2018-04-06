package com.example.webshop.rest

import com.example.webshop.entity.dto.CreateProductDto
import com.example.webshop.service.ProductService
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/product")
class ProductController(private val productService: ProductService) {

    @GetMapping("/all")
    fun getProducts(principal: Principal) = productService.getProducts(principal.name!!)

    @PostMapping
    fun addProduct(@RequestBody createProductDto: CreateProductDto, principal: Principal)
            = productService.addNewProduct(createProductDto, principal.name!!)
}