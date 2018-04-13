package com.example.webshop.repository

import com.example.webshop.entity.OrderPosition
import org.springframework.data.jpa.repository.JpaRepository

interface OrderPositionRepository : JpaRepository<OrderPosition, Long>
