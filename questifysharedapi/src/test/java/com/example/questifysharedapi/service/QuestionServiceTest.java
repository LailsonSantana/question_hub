package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.model.User;
import com.example.questifysharedapi.model.UserRole;
import com.example.questifysharedapi.repository.AnswerRepository;
import com.example.questifysharedapi.repository.QuestionRepository;
import com.example.questifysharedapi.repository.UserRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {

    @InjectMocks
    private QuestionService questionService;

    @Mock
    private QuestionRepository questionRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AnswerRepository answerRepository;

    @Captor
    private ArgumentCaptor<Question> questionArgumentCaptor;

    @Nested
    class saveQuestion{

        @Test
        void testSaveQuestion_successful() {

        }


        @Test
        void shouldSaveAQuestionWithSuccess() {

            // ARRANGE
            var user = new User(3L, "Margaret" , "lailsonbit@gmail.com", "lailson123abc", LocalDateTime.now(),
                    UserRole.STUDENT, null , null , null);
            var question = new Question(2L , "Teste" , "Physics I" , null , null , null , user ,
                    null , null , "Não Tem" , null , 3 , 4.6);
            var questionRecordDTO = new QuestionRecordDTO(2L , "Teste" , "Física I",
            null , 3L , "Jhon" , 1L , "Não Tem" , null , 3 ,
                    4.6);

            Mockito.when(userRepository.findById(3L)).thenReturn(Optional.of(user));

            // ACT
            Mockito.doReturn(question).when(questionRepository).save(questionArgumentCaptor.capture());
            var output = questionService.saveQuestion(questionRecordDTO);
            var questionCaptured = questionArgumentCaptor.getValue();

            // ASSERT
            assertEquals(output.getId() , questionCaptured.getId());
            assertEquals(output.getStatement() , questionCaptured.getStatement());
        }
    }


}