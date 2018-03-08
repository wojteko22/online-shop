package com.example.webshop

import org.springframework.data.repository.CrudRepository

interface ShopRepository : CrudRepository<Shop, Long>
