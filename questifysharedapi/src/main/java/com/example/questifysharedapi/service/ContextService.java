package com.example.questifysharedapi.service;

import com.example.questifysharedapi.model.Context;
import com.example.questifysharedapi.repository.ContextRepository;

import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@Slf4j
public class ContextService {

    @Autowired
    private ContextRepository contextRepository;

    public void saveContext(String newContext) {
        Context context = new Context();
        context.setText(newContext);
        contextRepository.save(context);
    }

    public Optional<Context> getContext(){
        //log.info("{}",contextRepository.findById(4L));
        
        return contextRepository.findById(4L);
    }
}

