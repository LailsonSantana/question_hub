package com.example.questifysharedapi.service;

import com.example.questifysharedapi.dto.ContextRecordDTO;
import com.example.questifysharedapi.model.Context;
import com.example.questifysharedapi.repository.ContextRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class ContextService {

    @Autowired
    private ContextRepository contextRepository;

    public Context saveContext(ContextRecordDTO newContext) {
        Context context = new Context();
        context.setText(newContext.text());
        return contextRepository.save(context);
    }

    public Context getContext(Long id){
        Optional<Context> opContext = contextRepository.findById(id);
        return opContext.get();
    }

    public List<Context> getAllContexts(){
        //log.info("{}",contextRepository.findById(4L));
        
        return contextRepository.findAll();
    }
}

