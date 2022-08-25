package org.example.audio;

import org.assertj.core.api.Assertions;
import org.example.audio.dto.AudioData;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class AudioServiceTest {

    @InjectMocks
    private AudioService service;

    @Test
    public void test() {
        String path = "PATH TO FILE";
        AudioData audioData = service.find(path);
        Assertions.assertThat(audioData.getBase64Content()).isNotNull();
    }
}
