package com.example.questifysharedapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

// Indicate to spring that this is class to exception treatment
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(DuplicatedException.class)
    private ResponseEntity<String> duplicatedHandler(DuplicatedException exception){
        return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists");
    }

    @ExceptionHandler(RuntimeException.class)
    private ResponseEntity<String> internalErrorHandler(RuntimeException exception){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("There is an internal error , try again later");
    }

    @ExceptionHandler(InvalidVersionException.class)
    private ResponseEntity<String> invalidVersionHandler(InvalidVersionException exception){
        return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED).body("That question can't own a version");
    }

    @ExceptionHandler(InappropriateContentException.class)
    private ResponseEntity<String> inappropriateContentHandler(InappropriateContentException exception){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O conteúdo da questão contém termos inadequados ou foi mau formulado, tente\" +\n" +
                "                    \" modificar o seu enunciado e envie novamente");
    }

    @ExceptionHandler(UserNotExist.class)
    private ResponseEntity<String> userNotExistHandler(UserNotExist exception){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This email is not registered");
    }

    @ExceptionHandler(IncorrectPassword.class)
    private ResponseEntity<String> incorrectPasswordHandler(IncorrectPassword exception){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password , try again");
    }

}
