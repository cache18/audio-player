package org.example.library.parser;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ParserFactory {
    private final Map<FileType, Parser> parsers;

    @Autowired
    public ParserFactory(List<Parser> parsers) {
        this.parsers = new HashMap<>();
        parsers.forEach(p -> this.parsers.put(p.forType(), p));
    }

    public Parser getParser(File file) {
        FileType fileType = FileType.fromFile(file.getName());
        return this.parsers.get(fileType);
    }
}
