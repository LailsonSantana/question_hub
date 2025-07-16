package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.exception.InappropriateContentException;
import com.example.questifysharedapi.exception.InvalidVersionException;
import com.example.questifysharedapi.exception.QuestionNotFound;
import com.example.questifysharedapi.mapper.MapperQuestion;
import com.example.questifysharedapi.model.Answer;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.model.User;
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
    private final OpenAiService openAiService;
    private final MapperQuestion mapperQuestion;


    public Question saveQuestion(QuestionRecordDTO questionRecordDTO){

        if(verifyStatement(questionRecordDTO.statement(), 0)){

            Question question = mapperQuestion.toQuestion(questionRecordDTO);
            if(questionRecordDTO.userId() != null){
                Optional<User> possibleUser = userRepository.findById(questionRecordDTO.userId());
                possibleUser.ifPresent(question::setUser);
            }
            question.setCountRating(0);
            question.setTotalRating(0d);
            question.getAnswers().forEach(answer -> answer.setQuestion(question));
            Question questionSaved = questionRepository.save(question);

            return questionRepository.save(questionSaved);
        }

        throw new InappropriateContentException("This content is Unappropriated.");
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
            return questionRepository.save(questionSaved);
        }
        throw new InvalidVersionException("This question is a version of another question");
    }

    public Boolean verifyStatement(String statement, int model){

        String response = "";

        //Define model chosen
        if(model == 0){
            response = openAiService.getClassification(statement);
        }

        log.info("Response of Model {}" , response);
        log.info("Response of equals {}" , response.equals("INADEQUADO"));
        return !response.equals("INADEQUADO");
        //return true;
    }

    @Transactional
    public List<QuestionRecordDTO> getAllQuestions(){

        List<Question> questions = questionRepository.findAllByOrderByIdAsc();
        List<QuestionRecordDTO> qrd = mapperQuestion.toQuestionsDTO(questions);
        log.info("Usuário xx {}" , qrd.get(0).nameUser());
        return qrd;
    }

    @Transactional
    public List<QuestionRecordDTO> filterQuestions(List<String> disciplines) {
        List<Question> questions = new ArrayList<>();
        for(String discipline : disciplines){
            questions.addAll(questionRepository.findAllByDiscipline(discipline));
        }
        return mapperQuestion.toQuestionsDTO(questions);
    }

    @Transactional
    public List<QuestionRecordDTO> getAllByUser(Long userId){

        List<Question> questions = questionRepository.findAllByUser_id(userId);
        return mapperQuestion.toQuestionsDTO(questions);
    }

    @Transactional 
    public QuestionRecordDTO getQuestionById(Long questionId){

        Optional<Question> existingQuestion = questionRepository.findById(questionId);
        if(existingQuestion.isPresent()){
            return mapperQuestion.toQuestionDTO(existingQuestion.get());
        }
        throw new RuntimeException("Question Not Found");
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
        Question question = new Question();
        if(existingQuestion.isPresent()){
            question = existingQuestion.get();
        }
        else{
            throw new QuestionNotFound("Question Not Found");
        }


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
