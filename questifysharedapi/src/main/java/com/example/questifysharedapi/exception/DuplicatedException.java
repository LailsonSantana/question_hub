package com.example.questifysharedapi.exception;

public class DuplicatedException extends RuntimeException{

    public DuplicatedException(String message) {
        super(message);
    }
}
