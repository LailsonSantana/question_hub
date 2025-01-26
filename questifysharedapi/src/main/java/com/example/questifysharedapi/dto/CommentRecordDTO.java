package com.example.questifysharedapi.dto;

import java.time.LocalDateTime;

public record CommentRecordDTO(Long id,
                               String text,
                               Long userId,
                               Long questionId,
                               String nameUser,
                               String createdAt) {
}
