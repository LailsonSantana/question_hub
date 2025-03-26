package com.example.questifysharedapi.mapper;

import com.example.questifysharedapi.dto.AnswerRecordDTO;
import com.example.questifysharedapi.model.Answer;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.repository.AnswerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class MapperAnswer {

    private final AnswerRepository answerRepository;

    public List<Answer> mapToAnswers(List<AnswerRecordDTO> answersDTO, Question question){
        List<Answer> answers = new ArrayList<>();
        answers = answersDTO.stream().map(answerDTO -> {
            Answer answer = new Answer();
            answer.setText(answerDTO.text());
            answer.setIsCorrect(answerDTO.isCorrect());
            answer.setQuestion(question);
            return answerRepository.save(answer);
        }).collect(Collectors.toList());
        return answers;
    }

    public List<AnswerRecordDTO> mapToAnswersDTO(List<Answer> answers){
        return answers.stream().map(answer -> new AnswerRecordDTO(
                answer.getText(),
                answer.getIsCorrect()
        )).collect(Collectors.toList());
    }
}
