package com.example.questifysharedapi.mapper;


import com.example.questifysharedapi.dto.AnswerRecordDTO;
import com.example.questifysharedapi.model.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MapperAnswer2 {

    AnswerRecordDTO toDTO(Answer answer);
    Answer toAnswer(AnswerRecordDTO answerRecordDTO);

    List<AnswerRecordDTO> toDTOs(List<Answer> answers);
    List<Answer> toAnswers(List<AnswerRecordDTO> answerRecordDTOS);
}
