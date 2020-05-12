package com.comp.appointments.controllers;

import com.comp.appointments.dtos.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionsHandlerAdvice {

    @ResponseBody
    @ExceptionHandler(IllegalArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse illegalArgumentExceptionHandler(IllegalArgumentException ex) {
        ErrorResponse response = new ErrorResponse();
        response.message = ex.getMessage();
        return response;
    }

    @ResponseBody
    @ExceptionHandler(IllegalStateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ErrorResponse illegalStateExceptionHandler(IllegalStateException ex) {
        ErrorResponse response = new ErrorResponse();
        response.message = ex.getMessage();
        return response;
    }
}
