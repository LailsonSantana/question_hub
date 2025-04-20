package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.UserRecordDTO;
import com.example.questifysharedapi.exception.DuplicatedException;
import com.example.questifysharedapi.model.AccessToken;
import com.example.questifysharedapi.model.User;
import com.example.questifysharedapi.model.UserRole;
import com.example.questifysharedapi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Transactional
    public User saveUser(UserRecordDTO userRecordDTO) {
        
        log.info("User {}" , userRecordDTO);
        var possibleUser = getByEmail(userRecordDTO.email());
        UserRole userRole = UserRole.valueOf(userRecordDTO.role().toUpperCase());
        
        if(possibleUser != null){
            throw new DuplicatedException("User already exists!");
        }
        User user = new User();
        user.setName(userRecordDTO.name());
        user.setRole(userRole);
        user.setEmail(userRecordDTO.email());
        user.setPassword(userRecordDTO.password());
        encodePassword(user);
        return userRepository.save(user);
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public AccessToken authenticate(String email, String password) {
        // Verify if exists any user registered with this email
        var user = getByEmail(email);
        if(user == null){
            return null;
        }
        // Verify if the typed password is equals the password that is in the database
        boolean match = passwordEncoder.matches(password ,user.getPassword());

        if(match){
            return jwtService.generateToken(user);
        }
        return null;
    }

    private void encodePassword(User user){
        String originalPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(originalPassword);
        user.setPassword(encodedPassword);
    }
}
