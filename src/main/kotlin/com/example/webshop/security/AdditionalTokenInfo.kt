package com.example.webshop.security

class AdditionalTokenInfo(val map: Map<String, Any?>) {

    val userId: Long by map
    val shopId by map

    constructor(userId: Long, shopId: Long?) : this(mapOf("userId" to userId, "shopId" to shopId))
}
