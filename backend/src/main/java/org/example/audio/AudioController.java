package org.example.audio;

import org.example.audio.dto.AudioData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/audio")
public class AudioController {

    private final AudioService audioService;

    @Autowired
    public AudioController(AudioService audioService) {
        this.audioService = audioService;
    }

    @PostMapping("/find")
    public AudioData findAudio(@RequestBody String path) {
//        String path = "/media/cache18/Dane/Muzyka/Linkin Park/01. Burn It Down.mp3";
        return audioService.find(path);
    }
}
