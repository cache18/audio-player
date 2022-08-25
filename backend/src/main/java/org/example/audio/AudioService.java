package org.example.audio;

import org.example.audio.dto.AudioData;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.util.Base64;

@Service
public class AudioService {

    public AudioData find(String path) {
        byte[] bytes = readFile(path);
        String base64 = Base64.getEncoder().encodeToString(bytes);

        return new AudioData(base64);
    }

    private byte[] readFile(String path) {
        try {
            return Files.readAllBytes(new File(path).toPath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
