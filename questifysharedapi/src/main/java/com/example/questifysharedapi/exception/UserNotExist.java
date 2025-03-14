package com.example.questifysharedapi.exception;

public class UserNotExist extends RuntimeException {
    public UserNotExist(String message) {
        super(message);
    }
}
