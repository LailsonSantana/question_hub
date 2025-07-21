package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.exception.InappropriateContentException;
import com.example.questifysharedapi.exception.InvalidVersionException;
import com.example.questifysharedapi.exception.QuestionNotFound;
import com.example.questifysharedapi.factory.QuestionFactory;
import com.example.questifysharedapi.mapper.MapperQuestion;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.model.User;
import com.example.questifysharedapi.model.UserRole;
import com.example.questifysharedapi.repository.AnswerRepository;
import com.example.questifysharedapi.repository.QuestionRepository;
import com.example.questifysharedapi.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.function.Executable;
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
    private MapperQuestion mapperQuestion;

    @Mock
    private OpenAiService openAiService;

    @Captor
    private ArgumentCaptor<Question> questionArgumentCaptor;

    private QuestionFactory questionFactory;


    @Nested
    class saveQuestion{

        @Test
        @DisplayName("This method should save a question with successful")
        void shouldSaveAQuestionWithSuccess() {

            // ARRANGE
            var user = questionFactory.createValidUser();
            var question = questionFactory.createValidQuestion();
            var questionRecordDTO = questionFactory.createValidQuestionDTO();


            Mockito.when(userRepository.findById(questionRecordDTO.userId())).thenReturn(Optional.of(user));
            Mockito.when(openAiService.getClassification(questionRecordDTO.statement())).thenReturn("ADEQUADO");
            Mockito.when(mapperQuestion.toQuestion(questionRecordDTO)).thenReturn(question);
            Mockito.when(questionRepository.save(questionArgumentCaptor.capture())).thenReturn(question);

            // ACT
            var output = questionService.saveQuestion(questionRecordDTO);
            var questionCaptured = questionArgumentCaptor.getValue();

            // ASSERT
            assertEquals(output.getId(), questionCaptured.getId());
            assertEquals(output.getStatement(), questionCaptured.getStatement());
            assertIterableEquals(output.getAnswers(), questionCaptured.getAnswers());

        }

        @Test
        @DisplayName("This method should return an InappropriateContentException when trying to save")
        void shouldReturnAnExceptionWhenTryToSave(){

            // ARRANGE
            var questionRecordDTO = questionFactory.createValidQuestionDTO();

            Mockito.when(openAiService.getClassification(questionRecordDTO.statement())).thenReturn("INADEQUADO");

            // ACT
            Executable action = () -> questionService.saveQuestion(questionRecordDTO);

            // ASSERT
            assertThrows(InappropriateContentException.class, action);

        }
    }

    @Nested
    class saveNewVersion{

        @Test
        @DisplayName("")
        void shouldReturnQuestionNotFoundException(){
            // ARRANGE
            var questionRecordDTO = questionFactory.createValidQuestionDTO();


            Mockito.when(questionRepository.findById(3L)).thenReturn(Optional.empty());

            // ACT
            Executable action = () -> questionService.saveNewVersion(questionRecordDTO, 3L);

            //ASSERT
            assertThrows(QuestionNotFound.class, action);
        }

        @Test
        @DisplayName("")
        void shouldReturnInvalidVersionException(){
            // ARRANGE
            var questionRecordDTO = questionFactory.createValidQuestionDTO();
            var question = questionFactory.createValidQuestion();


            Mockito.when(questionRepository.findById(3L)).thenReturn(Optional.of(question));

            // ACT
            Executable action = () -> questionService.saveNewVersion(questionRecordDTO, 3L);

            //ASSERT
            assertThrows(InvalidVersionException.class, action);
        }

        @Test
        @DisplayName("")
        void shouldReturnInappropriateContentException(){
            // ARRANGE
            var questionRecordDTO = questionFactory.createValidQuestionDTO();
            var question = questionFactory.createValidQuestionWithoutPrevious();


            Mockito.when(questionRepository.findById(4L)).thenReturn(Optional.of(question));
            Mockito.when(openAiService.getClassification(questionRecordDTO.statement())).thenReturn("INADEQUADO");

            // ACT
            Executable action = () -> questionService.saveNewVersion(questionRecordDTO, 4L);

            //ASSERT
            assertThrows(InappropriateContentException.class, action);
        }

        @Test
        @DisplayName("")
        void shouldSaveANewVersionOfAQuestionWithSuccessful(){
            // ARRANGE

            // Version
            var user = questionFactory.createValidUser();
            var question = questionFactory.createValidQuestion();
            var questionRecordDTO = questionFactory.createValidQuestionDTO();
            // Original version
            var previousQuestion = questionFactory.createValidQuestionWithoutPrevious();
            var previousQuestionRecordDTO = questionFactory.createValidQuestionDTOWithoutPrevious();

            Mockito.when(questionRepository.findById(previousQuestionRecordDTO.id())).thenReturn(Optional.of(previousQuestion));
            Mockito.when(openAiService.getClassification(questionRecordDTO.statement())).thenReturn("ADEQUADO");
            Mockito.when(userRepository.findById(questionRecordDTO.userId())).thenReturn(Optional.of(user));
            Mockito.when(mapperQuestion.toQuestion(questionRecordDTO)).thenReturn(question);
            Mockito.when(questionRepository.save(questionArgumentCaptor.capture())).thenReturn(question);


            // ACT
            var output = questionService.saveNewVersion(questionRecordDTO, 4L);
            var questionCaptured = questionArgumentCaptor.getValue();

            // ASSERT
            assertEquals(output.getId(), questionCaptured.getId());
            assertEquals(output.getStatement(), questionCaptured.getStatement());
            assertIterableEquals(output.getAnswers(), questionCaptured.getAnswers());
            assertEquals(output.getUser(), questionCaptured.getUser());
        }

    }
}