package org.example.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.WriteResultChecking;

@Configuration
public class DbConfig {

    @Bean
    public MongoClient mongoClient(@Value("${MONGO_URL}") String dbUrl) {
        return MongoClients.create(dbUrl);
    }

    @Bean
    public MongoOperations mongoTemplate(@Autowired MongoClient client,
                                         @Value("${MONGO_DB}") String dbName) {
        MongoTemplate template = new MongoTemplate(client, dbName);
        template.setWriteResultChecking(WriteResultChecking.EXCEPTION);
        return template;
    }
}
