package com.example.questifysharedapi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class IAModeratorService {

    @Value("${spring.ai.huggingface.chat.api-key}")
    private String API_KEY;

    @Value("${spring.ai.huggingface.chat.api-url}")
    private String API_URL;

    private final RestTemplate restTemplate;
    private final ContextService contextService;


    public String generateResponse(String prompt) {
        if (prompt == null || prompt.trim().isEmpty()) {
            return "O prompt não pode estar vazio.";
        }

        // Configuração dos headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("Content-Type", "application/json");
        headers.set("Accept", "application/json");

        // Corpo da requisição
        Map<String, Object> body = new HashMap<>();
        prompt = contextService.getContext(1L) + prompt;
        body.put("inputs",  prompt);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("max_length", 5); // Limita a resposta a 50 tokens
        parameters.put("temperature", 0.1); // Controle da criatividade do modelo
        //parameters.put("repetition_penalty", 1.0); // Penaliza repetições para evitar ecoar o prompt
        body.put("parameters", parameters);

        try {
            // Conversão do corpo para JSON
            ObjectMapper objectMapperRequest = new ObjectMapper();
            String jsonBody = objectMapperRequest.writeValueAsString(body);

            // Criação da entidade HTTP com o corpo JSON
            HttpEntity<String> entity = new HttpEntity<>(jsonBody, headers);

            // Chamada à API
            ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.POST, entity, String.class);


            // Processamento da resposta para remover o prompt, se presente
            String responseBody = response.getBody();

            ObjectMapper objectMapperResponse = new ObjectMapper();
            JsonNode rootNode = objectMapperResponse.readTree(responseBody);

            String generatedText = rootNode.get(0).path("generated_text").asText();

            String[] parts = generatedText.split("<p>|</p>");

            return parts[parts.length - 1].trim();

        } catch (Exception e) {
            e.printStackTrace();
            return "Erro ao chamar o serviço: " + e.getMessage();
        }
    }
}
