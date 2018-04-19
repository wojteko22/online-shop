package com.example.webshop.rest

import org.springframework.dao.DataIntegrityViolationException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice

class ErrorDto(val message: String?)

@RestControllerAdvice
class GlobalControllerExceptionHandler {

    @ResponseStatus(HttpStatus.CONFLICT)
    @ExceptionHandler(DataIntegrityViolationException::class, IllegalStateException::class)
    fun handleIllegalState(e: Exception) = handle(e)

    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ExceptionHandler(IllegalArgumentException::class)
    fun handleIllegalArgument(e: Exception) = handle(e)

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoSuchElementException::class)
    fun handleLackOfResource(e: Exception) = handle(e)

    fun handle(e: Exception): ErrorDto {
        e.printStackTrace()
        return ErrorDto(e.message)
    }
}
