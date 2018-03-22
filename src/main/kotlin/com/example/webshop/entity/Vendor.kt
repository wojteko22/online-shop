package com.example.webshop.entity

import javax.persistence.OneToOne

class Vendor(
        @OneToOne val user: User,
        @OneToOne val shop: Shop
)