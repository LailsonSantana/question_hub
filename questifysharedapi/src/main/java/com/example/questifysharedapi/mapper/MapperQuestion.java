package com.example.questifysharedapi.mapper;


import com.example.questifysharedapi.dto.AnswerRecordDTO;
import com.example.questifysharedapi.dto.QuestionRecordDTO;
import com.example.questifysharedapi.model.Answer;
import com.example.questifysharedapi.model.Question;
import com.example.questifysharedapi.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MapperQuestion {

    @Mappings({
            @Mapping(source = "user.id", target = "userId"),
            @Mapping(source = "user.name", target = "nameUser"),
            @Mapping(source = "previousVersion.id", target = "previousId"),
            @Mapping(source = "createdAt", target = "createdAt", dateFormat = "dd/MM/yyyy")
    })
    QuestionRecordDTO toQuestionDTO(Question question);

    @Mapping(source = "userId", target = "user")
    Question toQuestion(QuestionRecordDTO questionRecordDTO);

    AnswerRecordDTO toAnswerDTO(Answer answer);
    Answer toAnswer(AnswerRecordDTO answerRecordDTO);


    List<QuestionRecordDTO> toQuestionsDTO(List<Question> questions);
    List<Question> toQuestions(List<QuestionRecordDTO> questionRecordDTOS);

    List<AnswerRecordDTO> toAnswersRecordDTO(List<Answer> answers);
    List<Answer> toAnswers(List<AnswerRecordDTO> answerRecordDTOS);


    default User mapUser(Long id) {
        if (id == null) return null;
        User user = new User();
        user.setId(id);
        return user;
    }

}
