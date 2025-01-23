package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.AnswerRecordDTO;
import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.exception.InappropriateContentException;
import com.example.questifysharedapi.model.Answer;
import com.example.questifysharedapi.model.Context;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.repository.AnswerRepository;
import com.example.questifysharedapi.repository.QuestionRepository;
import com.example.questifysharedapi.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

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
            log.info("ALTERNATIVA {}" , questionRecordDTO);
            question.setStatement(questionRecordDTO.statement());
            question.setDiscipline(questionRecordDTO.discipline());
            if(questionRecordDTO.userId() != null){
                question.setUser(userRepository.findById(questionRecordDTO.userId()).get());
            }
            Question questionSaved = questionRepository.save(question);
            List<Answer> answers = questionRecordDTO.answers().stream().map(answerDTO -> {
            Answer answer = new Answer();
            answer.setText(answerDTO.text());
            answer.setIsCorrect(answerDTO.isCorrect());
            answer.setQuestion(questionSaved); // Related the answer at question
            return answerRepository.save(answer); // save the answer
            }).collect(Collectors.toList());
            questionSaved.setAnswers(answers);
            return questionRepository.save(question);
        }
        
        throw new InappropriateContentException("This content is Inappropriated.");
        
    }

    public Boolean verifyToxicty(String statement){

        /*  Context saved on database
        String context = contextService.getContext().get().getText();
        String response = chatModel.call(context + "\n" + "[ENUNCIADO :" + statement + "]");
        //String response = "ADEQUADO";
        log.info("O enunciado é" , statement);
        log.info("RESPOSTAAAAA GPT {}" , response);

        if("ADEQUADO".equals(response)){
            log.info("O RESULTADO FOI VERDADEIRO");
            return true;
        }
        log.info("O RESULTADO FOI FALSOOOOOOO");*/
        return true;
    }

   

   public List<QuestionRecordDTO> getAllQuestions(){
        List<Question> questions = new ArrayList<>();
        questions = questionRepository.findAll();
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
                        question.getUser().getName()
                ))
                .collect(Collectors.toList());
    }

    @Transactional
    public List<QuestionRecordDTO> filterQuestions(String discipline) {
        List<Question> questions = new ArrayList<>();
        questions = questionRepository.findAllByDiscipline(discipline);
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
                question.getUser().getName()
                )).collect(Collectors.toList());
        log.info("OBJETOOOOO {}" ,qdto);
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
            question.getUser().getName()
        )).collect(Collectors.toList());
        log.info("QUESTÕES DO USUÁRIO: {}" ,qdto);
        return qdto;
    }
}
