package com.example.questifysharedapi.mapper;


import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.model.Question;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MapperQuestion2 {

    QuestionRecordDTO toDTO(Question question);
    Question toQuestion(QuestionRecordDTO questionRecordDTO);

    List<QuestionRecordDTO> toDTOs(List<Question> questions);
    List<Question> toQuestions(List<QuestionRecordDTO> questionRecordDTOS);
}
