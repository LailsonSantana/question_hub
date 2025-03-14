package com.example.questifysharedapi.controller;

import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.exception.InappropriateContentException;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.service.OpenAiService;
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
    private final OpenAiService openAiService;
    
    @PostMapping
    public ResponseEntity<?> saveQuestion(@RequestBody QuestionRecordDTO questionRecordDTO){
            return ResponseEntity.status(HttpStatus.CREATED).body(questionService.saveQuestion(questionRecordDTO));
    }

    @GetMapping
    public ResponseEntity<List<QuestionRecordDTO>> getAllQuestions(){

        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<QuestionRecordDTO>> filterQuestions(@RequestParam List<String> disciplines){
        
        List<QuestionRecordDTO> qdto = questionService.filterQuestions(disciplines);
        return ResponseEntity.ok(qdto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<QuestionRecordDTO>> getQuestionsByUserId(@PathVariable Long id){
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

            return ResponseEntity.status(HttpStatus.CREATED).body(questionService.saveNewVersion(questionRecordDTO , id));
    }

    @PostMapping("/getClassification")
    public ResponseEntity<String> getClassification(@RequestBody String statement){
        return ResponseEntity.status(HttpStatus.OK).body((openAiService.getClassification(statement)));
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
