package com.example.questifysharedapi.repository;

import com.example.questifysharedapi.model.Classification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClassificationRepository extends JpaRepository<Classification, Long> {

    Optional<Classification> findByUserIdAndQuestionId(Long userId, Long questionId);
}
