package org.example.library;

import org.example.library.parser.FileType;
import org.example.library.parser.ParserFactory;
import org.example.library.parser.dto.MusicMetadata;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class LibraryService {
    private final ParserFactory parserFactory;
    private final String libraryPath;
    @Autowired
    public LibraryService(@Value("${LIBRARY_ROOT}") String libraryPath, ParserFactory parserFactory) {
        this.libraryPath = libraryPath;
        this.parserFactory = parserFactory;
    }

    public List<MusicMetadata> getFiles(String path) {
        try {
            return listFiles(path);
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private List<MusicMetadata> listFiles(String path) throws IOException {
        Path start = new File(path).toPath();
        try(Stream<Path> walk = Files.walk(start)) {
            return walk.filter(Files::isRegularFile)
                    .map(Path::toFile)
                    .filter(FileType::isSupported)
                    .map(File::getAbsoluteFile)
                    .map(f -> parserFactory.getParser(f).parse(f))
                    .collect(Collectors.toList());
        }
    }

    public List<String> getDirectories() {
        try {
            return readDirectories();
        } catch (IOException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private List<String> readDirectories() throws IOException {
        Path start = new File(libraryPath).toPath();
        try(Stream<Path> walk = Files.walk(start)) {
            return walk.filter(Files::isDirectory)
                    .map(Path::toFile)
                    .map(File::getAbsolutePath)
                    .collect(Collectors.toList());
        }
    }
}
