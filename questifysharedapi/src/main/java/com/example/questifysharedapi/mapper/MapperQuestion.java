package com.example.questifysharedapi.mapper;

import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.repository.QuestionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class MapperQuestion {

    private final QuestionRepository questionRepository;
    private final MapperAnswer mapperAnswer;

    public List<QuestionRecordDTO> mapToQuestionsDTO(List<Question> questions){
        return questions.stream().map(question -> new QuestionRecordDTO(
                question.getId(),
                question.getStatement(),
                question.getDiscipline(),
                mapperAnswer.mapToAnswersDTO(question.getAnswers()),
                question.getUser().getId(),
                question.getUser().getName(),
                question.getPreviousVersion() == null? 0 : question.getPreviousVersion().getId(),
                question.getJustification() == null? "SEM JUSTIFICATIVA" : question.getJustification(),
                question.getCreatedAt() == null? "Sem Data" : formatDate(question.getCreatedAt()),
                question.getCountRating() == null? 0 : question.getCountRating(),
                question.getTotalRating() == null? 0 : question.getTotalRating()
        )).collect(Collectors.toList());
    }

    public String formatDate(LocalDateTime date){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        return date.format(formatter);
    }
}
