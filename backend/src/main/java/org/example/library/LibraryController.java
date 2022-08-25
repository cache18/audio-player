package org.example.library;

import org.example.library.parser.dto.MusicMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/library")
public class LibraryController {

    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping("/read")
    public List<MusicMetadata> getFiles(@RequestBody String path) {
        return libraryService.getFiles(path);
    }

    @GetMapping("/")
    public List<String> getDirectories() {
        return libraryService.getDirectories();
    }
}
