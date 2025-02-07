package com.example.questifysharedapi.controller;



import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.exception.InappropriateContentException;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/questions")
@Slf4j // Annotation to log creation
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    
    @PostMapping
    public ResponseEntity<Question> saveQuestion(@RequestBody QuestionRecordDTO questionRecordDTO){
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(questionService.saveQuestion(questionRecordDTO));
        }catch (InappropriateContentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<QuestionRecordDTO>> getAllQuestions(){

        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<QuestionRecordDTO>> filterQuestions(@RequestParam List<String> disciplines){
        log.info("Filter question foi chamado {}" , disciplines);
        
        List<QuestionRecordDTO> qdto = questionService.filterQuestions(disciplines);
        return ResponseEntity.ok(qdto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<QuestionRecordDTO>> getQuestionsByUserId(@PathVariable Long id){
        log.info("FOI CHAMADO O MÉTODO BY USER ID");
        List<QuestionRecordDTO> qdto = questionService.getAllByUser(id);
        return ResponseEntity.ok(qdto);
    }

    @GetMapping("questionId/{id}")
    public ResponseEntity<QuestionRecordDTO> getQuestionsById(@PathVariable Long id){
        QuestionRecordDTO qdto = questionService.getQuestionById(id);
        return ResponseEntity.ok(qdto);
    }

    @PostMapping("/new-version/{id}")
    public ResponseEntity<Question> saveNewVersion(@PathVariable Long id,@RequestBody QuestionRecordDTO questionRecordDTO){
        
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(questionService.saveNewVersion(questionRecordDTO , id));
            //body(questionService.saveNewVersion(questionRecordDTO , id));
        }catch(Exception e){
            //log.error("Erro ao salvar nova versão da questão com id " + id, e); // Log da exceção
            return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED).build(); // Ret
        }
        
    }

    @PatchMapping("/update-rating/{newRating}/{questionId}")
    public ResponseEntity<Double> updateRating(@PathVariable Double newRating, @PathVariable Long questionId){

        //Double newRating = (Double) requestBody.get("newRating");
        log.info("O RATE RECEBIDO FOI:",newRating);
        return ResponseEntity.status(HttpStatus.OK).body(questionService.updateRating(newRating, questionId));
    }

    @GetMapping("rating/{questionId}")
    public ResponseEntity<Double> getRating(@PathVariable Long questionId) {
        return ResponseEntity.status(HttpStatus.OK).body(questionService.getRating(questionId));
    }
    
}
