package com.example.questifysharedapi.dto;


public record UserRecordDTO(Long id,
                            String name,
                            String email,
                            String password,
                            String role ,
                            Long questionId) {
}
