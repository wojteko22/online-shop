package com.example.webshop.security

class AdditionalTokenInfo(val map: Map<String, Any>) {

    val userId: Long by map

    constructor(userId: Long) : this(mapOf("userId" to userId))
}
