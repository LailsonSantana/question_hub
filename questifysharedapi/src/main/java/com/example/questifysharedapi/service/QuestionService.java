package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.exception.InappropriateContentException;
import com.example.questifysharedapi.exception.InvalidVersionException;
import com.example.questifysharedapi.mapper.MapperQuestion;
import com.example.questifysharedapi.model.Answer;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.repository.AnswerRepository;
import com.example.questifysharedapi.repository.QuestionRepository;
import com.example.questifysharedapi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    private final OpenAiChatModel chatModel;
    private final ContextService contextService;
    private final MapperQuestion mapperQuestion;


    @Transactional
    public Question saveQuestion(QuestionRecordDTO questionRecordDTO){
        
        if(verifyToxicity(questionRecordDTO.statement())){
            Question question = new Question();
            question.setStatement(questionRecordDTO.statement());
            question.setDiscipline(questionRecordDTO.discipline());
            question.setJustification(questionRecordDTO.justification());
            question.setCountRating(0);
            question.setTotalRating(0d);
            if(questionRecordDTO.userId() != null){
                question.setUser(userRepository.findById(questionRecordDTO.userId()).get());
            }
            Question questionSaved = questionRepository.save(question);
            //List<Answer> answers = mapperAnswer.mapToAnswers(questionRecordDTO.answers(),questionSaved);
            List<Answer> answers = questionRecordDTO.answers().stream().map(answerDTO -> {
            Answer answer = new Answer();
            answer.setText(answerDTO.text());
            answer.setIsCorrect(answerDTO.isCorrect());
            answer.setQuestion(questionSaved); // Related to answer at question
            return answerRepository.save(answer); // save the answer
            }).collect(Collectors.toList());
            questionSaved.setAnswers(answers);
            return questionRepository.save(question);
        }
        
        throw new InappropriateContentException("This content is Inappropriated."); 
    }

    @Transactional
    public Question saveNewVersion(QuestionRecordDTO questionRecordDTO , Long id){
        
        Optional<Question> previousQuestion = questionRepository.findById(id);
        Question question = new Question();
        if(previousQuestion.get().getPreviousVersion() == null){

            question.setStatement(questionRecordDTO.statement());
            question.setDiscipline(questionRecordDTO.discipline());
            question.setPreviousVersion(previousQuestion.get());

            if(questionRecordDTO.userId() != null){
                question.setUser(userRepository.findById(questionRecordDTO.userId()).get());
            }

            Question questionSaved = questionRepository.save(question);
            //List<Answer> answers = mapperAnswer.mapToAnswers(questionRecordDTO.answers(),questionSaved);
            List<Answer> answers = questionRecordDTO.answers().stream().map(answerDTO -> {
            Answer answer = new Answer();
            answer.setText(answerDTO.text());
            answer.setIsCorrect(answerDTO.isCorrect());
            answer.setQuestion(questionSaved); // Related to answer at question
            return answerRepository.save(answer); // save the answer
            }).collect(Collectors.toList());
            questionSaved.setAnswers(answers);
            return questionRepository.save(question);
        }
        throw new InvalidVersionException("This question is a version of another question");
    }

    public Boolean verifyToxicity(String statement){

        return true;
    }

    @Transactional
    public List<QuestionRecordDTO> getAllQuestions(){

        List<Question> questions = questionRepository.findAllByOrderByIdAsc();
        return mapperQuestion.mapToQuestionsDTO(questions);
    }

    @Transactional
    public List<QuestionRecordDTO> filterQuestions(List<String> disciplines) {
        List<Question> questions = new ArrayList<>();
        //questions = questionRepository.findAllByDiscipline(disciplines);
        for(String discipline : disciplines){
            questions.addAll(questionRepository.findAllByDiscipline(discipline));
        }
        return mapperQuestion.mapToQuestionsDTO(questions);
    }

    @Transactional
    public List<QuestionRecordDTO> getAllByUser(Long userId){

        List<Question> questions = questionRepository.findAllByUser_id(userId);
        return mapperQuestion.mapToQuestionsDTO(questions);
    }

    @Transactional 
    public QuestionRecordDTO getQuestionById(Long questionId){

        Optional<Question> existingQuestion = questionRepository.findById(questionId);
        List<Question> questions = new ArrayList<>();
        questions.add(existingQuestion.get());

        return mapperQuestion.mapToQuestionsDTO(questions).get(0);
    }

    @Transactional
    public Double getRating(Long questionId){
        Question question = new Question();
        Optional<Question> existingQuestion = questionRepository.findById(questionId);

        if(existingQuestion.isPresent()){
            question = existingQuestion.get();
            return question.getTotalRating() / question.getCountRating();
        }
        
        return 0.0;  
    }

    @Transactional
    public Double updateRating(Double newRating, Long questionId){

        Optional<Question> existingQuestion = questionRepository.findById(questionId);
        Question question = existingQuestion.get();

        int newCount = question.getCountRating() == null? 0 : question.getCountRating() + 1;
        double newTotalRating = question.getTotalRating() == null? 0 : question.getTotalRating() + newRating;

        question.setCountRating(newCount);
        question.setTotalRating(newTotalRating);

        questionRepository.save(question);

        return newTotalRating / newCount ;
    }

    public String formatDate(LocalDateTime date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return date.format(formatter);
    }
}
