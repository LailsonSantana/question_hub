package com.example.questifysharedapi.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "TB_QUESTION")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Lob
    @Column(unique = true) // Set up this field like a data column
    private String statement;

    @Column(nullable = true)
    private String discipline;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Answer> answers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Comment> comments;

    @OneToMany(mappedBy = "question")
    private List<Classification> classifications = new ArrayList<>();

    @JoinColumn(name = "user_id" , nullable = true)
    @ManyToOne
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "previous_version_id")
    @JsonIgnore
    private Question previousVersion;

    @OneToMany(mappedBy = "previousVersion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> nextVersions = new ArrayList<>();

    @Column(nullable = true)
    private  String justification;

    private LocalDateTime createdAt;

    @Column(nullable = true)
    private Integer countRating;

    @Column(nullable = true)
    private Double totalRating;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
    
}
