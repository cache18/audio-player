package org.example.library.parser.types;

import org.example.library.parser.FileType;
import org.example.library.parser.Parser;
import org.example.library.parser.dto.MusicMetadata;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class EmptyParser implements Parser {
    @Override
    public MusicMetadata parse(File file) {
        MusicMetadata metadata = new MusicMetadata();
        metadata.setPath(file.getAbsolutePath());
        return metadata;
    }

    @Override
    public FileType forType() {
        return FileType.EMPTY;
    }
}
