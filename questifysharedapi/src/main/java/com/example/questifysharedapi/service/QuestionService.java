package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.AnswerRecordDTO;
import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.exception.InappropriateContentException;
import com.example.questifysharedapi.exception.InvalidVersionException;
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


    @Transactional
    public Question saveQuestion(QuestionRecordDTO questionRecordDTO){
        
        if(verifyToxicty(questionRecordDTO.statement())){
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

    public Boolean verifyToxicty(String statement){

        return true;
    }

    @Transactional
    public List<QuestionRecordDTO> getAllQuestions(){
        List<Question> questions = new ArrayList<>();
        questions = questionRepository.findAllByOrderByIdAsc();
        return questions.stream()
                .map(question -> new QuestionRecordDTO(
                        question.getId(),
                        question.getStatement(),
                        question.getDiscipline(),
                        question.getAnswers().stream()
                                .map(answer -> new AnswerRecordDTO(
                                        answer.getText(),
                                        answer.getIsCorrect()
                                )).collect(Collectors.toList()),
                        question.getUser().getId(),
                        question.getUser().getName(),
                        question.getPreviousVersion() == null? 0 : question.getPreviousVersion().getId(),
                        question.getJustification() == null? "SEM JUSTIFICATIVA" : question.getJustification(),
                        question.getCreatedAt() == null? "Sem Data" : formatDate(question.getCreatedAt()),
                        question.getCountRating() == null? 0 : question.getCountRating(),
                        question.getTotalRating() == null? 0 : question.getTotalRating()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<QuestionRecordDTO> filterQuestions(List<String> disciplines) {
        List<Question> questions = new ArrayList<>();
        //questions = questionRepository.findAllByDiscipline(disciplines);
        for(String disciplina : disciplines){
            questions.addAll(questionRepository.findAllByDiscipline(disciplina));
        }
        List<QuestionRecordDTO> qdto = new ArrayList<>();

        qdto = questions.stream()
                .map(question -> new QuestionRecordDTO(
                    question.getId(),
                    question.getStatement(),
                    question.getDiscipline(),
                    question.getAnswers().stream()
                            .map(answer -> new AnswerRecordDTO(
                                answer.getText(),
                                answer.getIsCorrect()
                                    )).collect(Collectors.toList()),
                question.getUser().getId(),
                question.getUser().getName(),
                question.getPreviousVersion() == null? 0 : question.getPreviousVersion().getId(),
                question.getJustification() == null? "SEM JUSTIFICATIVA" : question.getJustification(),
                question.getCreatedAt() == null? "Sem Data" : formatDate(question.getCreatedAt()),
                question.getCountRating() == null? 0 : question.getCountRating(),
                question.getTotalRating() == null? 0 : question.getTotalRating()
                )).collect(Collectors.toList());
        log.info("OBJETO FINAL{}" ,qdto);
        return qdto;
    }

    @Transactional
    public List<QuestionRecordDTO> getAllByUser(Long userId){
        List<Question> questions = new ArrayList<>();
        questions = questionRepository.findAllByUser_id(userId);
        List<QuestionRecordDTO> qdto = new ArrayList<>();

        qdto = questions.stream()
        .map(question -> new QuestionRecordDTO(
            question.getId(),
            question.getStatement(),
            question.getDiscipline(),
            question.getAnswers().stream()
                    .map(answer -> new AnswerRecordDTO(
                        answer.getText(),
                        answer.getIsCorrect()
                        )).collect(Collectors.toList()),
            question.getUser().getId(),
            question.getUser().getName(),
            question.getPreviousVersion() == null? 0 : question.getPreviousVersion().getId(),
            question.getJustification() == null? "SEM JUSTIFICATIVA" : question.getJustification(),
            question.getCreatedAt() == null? "Sem Data" : formatDate(question.getCreatedAt()),
            question.getCountRating() == null? 0 : question.getCountRating(),
            question.getTotalRating() == null? 0 : question.getTotalRating()
        )).collect(Collectors.toList());
        log.info("QUESTÕES DO USUÁRIO: {}" ,qdto);
        return qdto;
    }

    @Transactional 
    public QuestionRecordDTO getQuestionById(Long questionId){

        Question question = new Question();
        Optional<Question> existingQuestion = questionRepository.findById(questionId);
        question = existingQuestion.get();
        List<AnswerRecordDTO> answerRecordDTOs = question.getAnswers().stream()
        .map(answer -> new AnswerRecordDTO(answer.getText(), answer.getIsCorrect()))
        .collect(Collectors.toList());
        
        QuestionRecordDTO qdto = new QuestionRecordDTO(questionId, question.getStatement(), question.getDiscipline(), 
        answerRecordDTOs, question.getUser().getId(), question.getUser().getName() ,
        question.getPreviousVersion() == null? 0 : question.getPreviousVersion().getId(),
        question.getJustification() == null? "SEM JUSTIFICATIVA" : question.getJustification(),
        question.getCreatedAt() == null? "Sem Data" : formatDate(question.getCreatedAt()),
        question.getCountRating() == null? 0 : question.getCountRating(),
        question.getTotalRating() == null? 0 : question.getTotalRating()
        );
        
        return qdto;
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

        Question question = new Question();
        Optional<Question> existingQuestion = questionRepository.findById(questionId);
        question = existingQuestion.get();

        int newCount = question.getCountRating() == null? 0 : question.getCountRating() + 1;
        Double newTotalRating = question.getTotalRating() == null? 0 : question.getTotalRating() + newRating;

        question.setCountRating(newCount);
        question.setTotalRating(newTotalRating);

        questionRepository.save(question);

        return newTotalRating / newCount ;
    }
    
    public String formatDate(LocalDateTime date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String formattedDate = date.format(formatter);

        return formattedDate;
    }
}
