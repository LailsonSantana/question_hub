package com.example.questifysharedapi.exception;

public class QuestionNotFound extends RuntimeException {
    public QuestionNotFound(String message) {
        super(message);
    }
}
