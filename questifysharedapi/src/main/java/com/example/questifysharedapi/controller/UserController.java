package com.example.questifysharedapi.controller;

import com.example.questifysharedapi.dto.CredentialsDTO;
import com.example.questifysharedapi.dto.UserRecordDTO;
import com.example.questifysharedapi.model.User;
import com.example.questifysharedapi.service.ContextService;
import com.example.questifysharedapi.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@Slf4j // Annotation to log creation
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;
    private final ContextService contextService;
    

    @PostMapping
    public ResponseEntity<User> saveUser(@RequestBody UserRecordDTO userRecordDTO){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(userRecordDTO));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/auth")
    public ResponseEntity autheticate(@RequestBody CredentialsDTO credentials){
        var token = userService.authenticate(credentials.getEmail(), credentials.getPassword());

        if(token == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok(token);
    }

    @PostMapping("/setContext")
    //@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> setUserContext(@RequestBody String newContext) {
        try {
            contextService.saveContext(newContext);
            return ResponseEntity.ok("Contexto definido com sucesso para o usuário!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Erro ao definir o contexto: " + e.getMessage());
        }
    }
}
