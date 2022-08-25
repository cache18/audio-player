package org.example.parser.types;

import org.assertj.core.api.Assertions;
import org.example.library.parser.dto.MusicMetadata;
import org.example.library.parser.types.Mp3Parser;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.File;

@ExtendWith(MockitoExtension.class)
public class Mp3ParserTest {

    public static final String PATH_TO_FILE = "PATH_TO_FILE";
    @InjectMocks
    private Mp3Parser parser;

    @Test
    public void parseFile() {
        File file = new File(PATH_TO_FILE);
        MusicMetadata metadata = parser.parse(file);
        Assertions.assertThat(metadata).isNotNull();
    }
}
