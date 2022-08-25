package org.example;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;

@TypeAlias("person")
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Person {
    @Id
    private String id;
    private String author;
    private String[] comments;
    private String message;


}
